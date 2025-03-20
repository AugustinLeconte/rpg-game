import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: string;
  userName: string;
  email: string;
  commands: Map<string, string>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<User>({} as User);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string) {
    localStorage.setItem('userId', '123');
    this.user.next({
      id: '123',
      userName: username,
      email: '',
      commands: {} as Map<string, string>,
    });
    return this.http.get<string[][]>('http://localhost:3000/map');
  }

  signinUser(username: string, email: string, password: string) {
    return this.http.get<string[][]>('http://localhost:3000/map');
  }
}
