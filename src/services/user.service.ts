import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  ingame?: {
    position: { x: number; y: number };
  };
  wantNewsletter: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<User>({} as User);
  user$ = this.user.asObservable();

  constructor() {}

  setUser(res: any) {
    this.user.next(res);
  }
}
