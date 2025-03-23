import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-menu',
  imports: [CommonModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent implements OnInit, OnDestroy {
  showEnterCode: boolean = false;
  showPartyCreation: boolean = false;
  enteredCode: string = '';
  userName: string = '';
  private userSubscription!: Subscription;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.userName = user.username;
    });
  }

  goToPage(url: string) {
    const navigationDetails: string[] = [];
    navigationDetails.push(url);
    this.router.navigate(navigationDetails);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
