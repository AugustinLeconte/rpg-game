import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../pages/auth/services/auth.service';
import { User, UserService } from '../../services/user.service';
import { firstValueFrom, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userSubscribtion!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  async canActivate(): Promise<boolean> {
    const userId = localStorage.getItem('userId');
    let userInfo = this.userService.getUser();
    if (userId && !userInfo.id) {
      const userValue = await this.authService.getUser(userId);
      if (userValue === null || !userValue.id) return this.goToAuth();
      else this.userService.updateUser(userValue);
      return true;
    } else if (userInfo.id) {
      return true;
    } else return this.goToAuth();
  }

  goToAuth(): boolean {
    this.router.navigate(['auth']);
    return false;
  }
}
