import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Message {
  username: string;
  message: string;
  hour: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages = new BehaviorSubject<Message[]>([]);
  messages$ = this.messages.asObservable();

  setMessages(messages: Message[]) {
    this.messages.next(messages);
  }
}
