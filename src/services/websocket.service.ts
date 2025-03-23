import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Player, PlayerService } from './player-service';
import { MapService } from '../app/pages/ingame/services/map-service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;
  private players = new BehaviorSubject<Player[]>([]);
  players$ = this.players.asObservable();

  constructor(
    private mapService: MapService,
    private readonly playerService: PlayerService
  ) {
    this.socket = io('http://localhost:3000');

    this.socket.on('playerJoined', (player: Player) => {
      console.log(`Connecté en tant que ${player.username} (ID: ${player.id})`);
    });

    this.socket.on('updatePlayers', (players: Player[]) => {
      const thisPlayer = players.filter(
        (player) => player.socketId == this.playerService.getPlayer().socketId
      )[0];
      if (thisPlayer) this.playerService.setPlayer(thisPlayer);
      console.log('reçu');
      this.players.next(players);
    });

    this.socket.on('connected', (socketId: string) => {
      this.playerService.addSocketId(socketId);
    });

    this.socket.on('map', (map: string[][]) => {
      this.mapService.setMap(map);
    });

    this.socket.on('location', (position: { x: number; y: number }) => {
      //console.log(position);
    });
  }

  joinGame(username: string) {
    this.socket.emit('playerJoin', { username });
  }

  sendMove(id: string, direction: string) {
    this.socket.emit('movePlayer', { id, direction });
  }
}
