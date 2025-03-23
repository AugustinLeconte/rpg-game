import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WheatService {
  private wheat = new BehaviorSubject<number>(200);
  wheat$ = this.wheat.asObservable();

  getWheat(): number {
    return this.wheat.value;
  }

  addWheat(value: number): void {
    this.wheat.next(this.wheat.value + value);
  }

  removeWheat(value: number): void {
    this.wheat.next(this.wheat.value - value);
  }
}
