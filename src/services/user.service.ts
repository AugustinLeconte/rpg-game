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
  socketId?: string | undefined;
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
    this.user.next(user);
  }

  setUserName(newUsername: string) {
    this.user.getValue().username = newUsername;
  }

  getUser() {
    return this.user.value;
  }

  addSocketId(socketId: string) {
    this.user.next({
      id: this.user.value.id,
      username: this.user.value.username,
      email: this.user.value.email,
      password: this.user.value.password,
      ingame: this.user.value.ingame,
      wantNewsletter: this.user.value.wantNewsletter,
      commands: this.user.value.commands,
      socketId: socketId,
    });
  }
}
