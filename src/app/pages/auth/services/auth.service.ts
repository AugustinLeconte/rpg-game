import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User, UserService } from '../../../../services/user.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  async loginUser(contact: string, password: string) {
    const variables = 'contact=' + contact + '&password=' + password;
    this.http
      .get(environment.misericordiaAPIURI + 'users/login&' + variables)
      .subscribe({
        next: (res: any) => {
          this.userService.updateUser(res.data);
          this.router.navigate(['']);
        },
      });
  }

  signinUser(username: string, email: string, password: string) {
    let status: string = '201';
    this.http
      .post(environment.misericordiaAPIURI + 'users', {
        username,
        email,
        password,
        wantNewsletter: false,
      })
      .subscribe({
        next: (res: any) => {
          this.userService.updateUser(res.data);
          status = res.status.toString();
          if (status === '201') this.router.navigate(['']);
        },
      });
    return status;
  }

  async getUser(userId: string): Promise<User> {
    return firstValueFrom(
      this.http.get<User>(environment.misericordiaAPIURI + 'users/' + userId)
    );
  }
}
