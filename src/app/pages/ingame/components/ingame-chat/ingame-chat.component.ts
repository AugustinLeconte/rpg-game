import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingame-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './ingame-chat.component.html',
  styleUrl: './ingame-chat.component.scss',
})
export class IngameChatComponent {
  typedMessage: string = '';
  messages: Array<string> = [];

  sendMessage() {
    this.messages.push(this.typedMessage);
    console.log(this.messages);
    this.typedMessage = '';
  }
}
