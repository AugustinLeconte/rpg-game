import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bag, BagService, Item } from '../../../services/bag.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent implements OnInit, OnDestroy {
  bag!: Bag;
  intentoryItems!: Item[];
  bagSubscription!: Subscription;
  isShowed: boolean = false;
  emptySlots: number[] = [];
  selectedItem!: Item;

  constructor(private bagService: BagService) {}

  ngOnInit(): void {
    this.bagSubscription = this.bagService.bag$.subscribe((bag) => {
      this.bag = bag;
      this.intentoryItems = bag.items.filter(
        (item) => item.isInInventory == true
      );
      console.log(this.intentoryItems);
      this.emptySlots = [];
      for (
        let index = 0;
        index < this.bag.maxSize - this.bag.items.length;
        index++
      )
        this.emptySlots.push(0);
    });
  }

  ngOnDestroy(): void {
    this.bagSubscription.unsubscribe();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key == 'i') this.isShowed = !this.isShowed;
  }

  selectItem(item: Item) {
    const element = document.getElementById('menuItem-' + item.id);
    if (element) {
      element.hidden = !element.hidden;
      this.selectedItem = item;
    }
  }

  toInventory(isTrue: boolean) {
    this.bagService.setItemToInventory(this.selectedItem.id, isTrue);
  }
}
