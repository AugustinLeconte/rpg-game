import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Player } from './player-service';
import { MapService } from './map-service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;
  private players = new BehaviorSubject<Player[]>([]);
  players$ = this.players.asObservable();

  constructor(private mapService: MapService) {
    this.socket = io('http://localhost:3000');

    this.socket.on('playerJoined', (player: Player) => {
      console.log(`Connecté en tant que ${player.username} (ID: ${player.id})`);
    });

    this.socket.on('updatePlayers', (players: Player[]) => {
      this.players.next(players);
    });

    this.socket.on('map', (map: string[][]) => {
      this.mapService.setMap(map);
    });

    this.socket.on('location', (position: { x: number; y: number }) => {
      console.log(position);
    });
  }

  joinGame(username: string) {
    this.socket.emit('playerJoin', { username });
  }

  sendMove(id: string, x: number, y: number) {
    this.socket.emit('movePlayer', { id, x, y });
  }
}
