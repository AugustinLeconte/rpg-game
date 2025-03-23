import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  isErrorWhenSigning: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  async signin() {
    this.authService
      .signinUser(this.username, this.email, this.password)
      .subscribe({
        next: (res: any) => {
          if (res.status == '201') {
            this.userService.setUser(res.data);
            this.router.navigate(['']);
          } else {
            this.isErrorWhenSigning = true;
            this.errorMessage = res.message;
          }
        },
      });
  }
}
