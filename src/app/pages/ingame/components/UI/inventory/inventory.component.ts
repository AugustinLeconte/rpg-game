import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bag, BagService } from '../../../services/bag.service';
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
  bagSubscription!: Subscription;

  constructor(private bagService: BagService) {}

  ngOnInit(): void {
    this.bagSubscription = this.bagService.bag$.subscribe((bag) => {
      this.bag = bag;
    });
  }

  ngOnDestroy(): void {
    this.bagSubscription.unsubscribe();
  }
}
