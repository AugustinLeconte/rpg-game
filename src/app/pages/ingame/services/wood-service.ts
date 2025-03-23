import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WoodService {
  private wood = new BehaviorSubject<number>(200);
  wood$ = this.wood.asObservable();

  getWood(): number {
    return this.wood.value;
  }

  addWood(value: number): void {
    this.wood.next(this.wood.value + value);
  }

  removeWood(value: number): void {
    this.wood.next(this.wood.value - value);
  }
}
