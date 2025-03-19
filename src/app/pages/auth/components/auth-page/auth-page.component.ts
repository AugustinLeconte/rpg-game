import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SigninComponent } from '../signin/signin.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-page',
  imports: [LoginComponent, SigninComponent, FormsModule, CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    let userId = localStorage.getItem('userId');
    console.log(userId);
    if (userId) {
      const navigationDetails: string[] = [];
      navigationDetails.push('/menu');
      this.router.navigate(navigationDetails);
    }
  }
}
