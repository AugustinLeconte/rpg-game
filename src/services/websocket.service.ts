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
    private readonly userService: UserService
  ) {
    this.socket = io(environment.misericordiaAPIURI, {
      transports: ['polling'],
    });

    this.socket.on('playerJoined', (player: Player) => {
      console.log(`Connecté en tant que ${player.username} (ID: ${player.id})`);
    });

    this.socket.on('updatePlayers', (players: Player[]) => {
      this.players.next(players);
      this.playerService.setPlayers(players);
    });

    this.socket.on('connected', (socketId: string) => {
      this.userService.addSocketId(socketId);
    });

    this.socket.on('map', (map: string[][]) => {
      this.mapService.setMap(map);
    });
  }

  joinGame(username: string) {
    this.socket.emit('playerJoin', { username });
  }

  sendMove(id: string, direction: string) {
    this.socket.emit('movePlayer', { id, direction });
  }
}
