import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingame-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './ingame-chat.component.html',
  styleUrl: './ingame-chat.component.scss',
})
export class IngameChatComponent implements OnInit, OnDestroy {
  typedMessage: string = '';
  userName: string = '';
  private userSubscription!: Subscription;
  messages: Array<string> = [];

  constructor(private userService: UserService) {}

  sendMessage() {
    this.messages.push(this.typedMessage);
    console.log(this.messages);
    this.typedMessage = '';
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.userName = user.username;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
