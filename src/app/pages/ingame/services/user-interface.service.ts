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
export class UserInterfaceService {
  user: UserInterface = { username: 'MorgustinLeNain' };

  setUserName(newUsername: string) {
    this.user.username = newUsername;
  }

  getUser(): UserInterface {
    return this.user;
  }
}
