import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RockService {
  private rock = new BehaviorSubject<number>(200);
  rock$ = this.rock.asObservable();

  getRock(): number {
    return this.rock.value;
  }

  addRock(value: number): void {
    this.rock.next(this.rock.value + value);
  }

  removeRock(value: number): void {
    this.rock.next(this.rock.value - value);
  }
}
