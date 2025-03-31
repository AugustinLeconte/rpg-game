import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import {
  Player,
  PlayerService,
} from '../app/pages/ingame/services/player-service';
import { MapService } from '../app/pages/ingame/services/map-service';
import { UserService } from './user.service';
import { environment } from '../environments/environment';
import {
  Message,
  MessageService,
} from '../app/pages/ingame/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;
  private players = new BehaviorSubject<Player[]>([]);
  players$ = this.players.asObservable();

  constructor(
    private mapService: MapService,
    private readonly playerService: PlayerService,
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) {
    this.socket = io(environment.misericordiaAPIURI, {
      transports: ['polling'],
    });

    this.socket.on('playerJoined', (player: Player) => {
      let now = new Date();
      this.messageService.addMessage({
        username: 'Serveur',
        message: 'Connecté au jeu',
        hour:
          now.getHours().toLocaleString() +
          ':' +
          (now.getMinutes() < 10
            ? '0' + now.getMinutes().toLocaleString()
            : now.getMinutes().toLocaleString()),
      });
    });

    this.socket.on('updatePlayers', (players: Player[]) => {
      this.players.next(players);
      this.playerService.setPlayers(players);
      const ourPlayer = this.playerService.getPlayerFromId(
        userService.getUser().id
      );
      if (ourPlayer)
        this.userService.setUserIngame({
          position: ourPlayer.position,
          direction: ourPlayer.lastDirection,
        });
    });

    this.socket.on('connected', (socketId: string) => {
      this.userService.addSocketId(socketId);
    });

    this.socket.on('map', (map: string[][]) => {
      this.mapService.setMap(map);
    });

    this.socket.on('messageSent', (messages: Array<Message>) => {
      this.messageService.setMessages(messages);
    });
  }

  joinGame(id: string, username: string) {
    this.socket.emit('playerJoin', { id, username });
  }

  sendMove(id: string, direction: string) {
    this.socket.emit('movePlayer', { id, direction });
  }

  sendMessage(username: string, message: string) {
    this.socket.emit('messageFromFront', { username, message });
  }
}
