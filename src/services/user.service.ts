import { Injectable } from '@angular/core';

export interface UserInterface {
  username: string;
  id?: string;
  level?: { id: number; experienceLeft: number };
  commands?: Map<string, string>;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: UserInterface = { username: 'MorgustinLeNain' };

  getUserName(): string {
    return this.user.username;
  }

  setUserName(newUsername: string) {
    this.user.username = newUsername;
  }

  getUser(): UserInterface {
    return this.user;
  }
}
