import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../../services/user.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../../../../../services/websocket.service';
import { Message, MessageService } from '../../../services/message.service';

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
  private messageSubscription!: Subscription;
  messages: Array<Message> = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private websocketService: WebsocketService
  ) {}

  sendMessage() {
    this.websocketService.sendMessage(this.userName, this.typedMessage);
    this.typedMessage = '';
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.userName = user.username;
    });
    this.messageSubscription = this.messageService.messages$.subscribe(
      (message) => {
        this.messages = message; //.reverse();
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.messageSubscription.unsubscribe();
  }
}
