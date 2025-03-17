import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  imports: [CommonModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
  showEnterCode: boolean = false;
  showPartyCreation: boolean = false;
  enteredCode: string = '';

  constructor(private router: Router) {}

  goToPage(url: string) {
    const navigationDetails: string[] = [];
    navigationDetails.push(url);
    this.router.navigate(navigationDetails);
  }
}
