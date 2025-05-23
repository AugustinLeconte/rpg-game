import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Bag {
  name: string;
  maxSize: number;
  inventorySize: number;
  items: Array<Item>;
}

export interface Item {
  id: string;
  name: string;
  durability: number;
  enchantment: string;
  type: string;
  isInInventory: boolean;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class BagService {
  private bag = new BehaviorSubject<Bag>({
    name: 'pockets',
    maxSize: 5,
    inventorySize: 2,
    items: [
      {
        id: '0',
        name: 'axe',
        durability: 10,
        enchantment: '',
        type: 'tool',
        isInInventory: true,
        description: 'utilisée pour couper du bois',
      },
      {
        id: '1',
        name: 'barrack',
        durability: 10,
        enchantment: '',
        type: 'weapon',
        isInInventory: false,
        description: 'utilisée pour tuer des monstres ... ou des gens',
      },
    ],
  } as Bag);
  bag$ = this.bag.asObservable();

  getBag() {
    return this.bag.value;
  }

  addItemToBag(item: Item): boolean {
    if (this.bag.value.items.length < this.bag.value.maxSize) {
      this.bag.getValue().items.push(item);
      return true;
    }
    return false;
  }

  updateItem(item: Item) {
    const index = this.bag
      .getValue()
      .items.findIndex((itemInBag) => itemInBag.id == item.id);
    if (index > 0) this.bag.getValue().items[index] = item;
  }

  setItemToInventory(itemId: string, inInventory: boolean): boolean {
    const itemsInInventory = this.bag
      .getValue()
      .items.filter((itemInBag) => itemInBag.isInInventory == true);
    if (itemsInInventory.length >= this.bag.value.inventorySize) return false;
    const index = this.bag
      .getValue()
      .items.findIndex((itemInBag) => itemInBag.id == itemId);
    if (index >= 0) {
      this.bag.getValue().items[index].isInInventory = inInventory;
      return true;
    }
    return false;
  }
}
