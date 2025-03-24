import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  ingame?: {
    position: { x: number; y: number };
  };
  wantNewsletter: boolean;
  commands: Map<string, string>;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<User>({} as User);
  user$ = this.user.asObservable();

  constructor() {}

  updateLocalUser(user: User) {
    this.user.next(user);
    localStorage.setItem('userId', user.id);
  }

  updateUser(user: User) {
    //ici faire appel au backend et modifier le user
    this.user.next(user);
  }

  setUserName(newUsername: string) {
    this.user.getValue().username = newUsername;
  }

  getUser() {
    return this.user.value;
  }
}
