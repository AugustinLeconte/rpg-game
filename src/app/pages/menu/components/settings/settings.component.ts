import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  UserInterface,
  UserService,
} from '../../../../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  updatingName: boolean = false;
  user: UserInterface = { username: '' };
  newUsername: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.newUsername = this.user.username;
  }

  updateName() {
    this.userService.setUserName(this.newUsername);
    this.user.username = this.newUsername;
    this.updatingName = false;
  }
}
