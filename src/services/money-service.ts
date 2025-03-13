import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoneyService {
  private money = new BehaviorSubject<number>(200);
  money$ = this.money.asObservable();

  getMoney(): number {
    return this.money.value;
  }

  addMoney(value: number): void {
    this.money.next(this.money.value + value);
  }

  removeMoney(value: number): void {
    this.money.next(this.money.value - value);
  }
}
