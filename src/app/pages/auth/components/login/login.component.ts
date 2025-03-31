import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isErrorWhenLogin: boolean = false;
  errorMessage: string = 'Problème lors de la connexion';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const response = this.authService.loginUser(this.username, this.password);

    if (response != '200') {
      this.isErrorWhenLogin == true;
    }
    //this.router.navigate(['']);
  }
}
