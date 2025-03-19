import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SigninComponent } from '../signin/signin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-page',
  imports: [LoginComponent, SigninComponent, FormsModule, CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  isLogin: boolean = false;
}
