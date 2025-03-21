import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    if (userId) {
      return true;
    } else {
      this.router.navigate(['auth']);
      return false;
    }
  }
}
