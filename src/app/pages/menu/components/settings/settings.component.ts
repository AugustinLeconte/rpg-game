import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  updatingName: boolean = false;
  user: User = {} as User;
  newUsername: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.newUsername = this.user.username;
  }

  updateName() {
    this.user.username = this.newUsername;
    this.userService.updateUser(this.user);
    this.updatingName = false;
  }
}
