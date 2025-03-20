import { Injectable, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { MapService } from './map-service';
import { BehaviorSubject } from 'rxjs';

export interface Player {
  id: string;
  username: string;
  position: { x: number; y: number };
  socketId: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private player = new BehaviorSubject<Player>({
    id: '1234',
    username: '',
    position: { x: 0, y: 0 },
    socketId: '',
  });
  player$ = this.player.asObservable();

  constructor() {}

  addSocketId(socketId: string) {
    this.player.next({
      id: this.player.value.id,
      username: this.player.value.username,
      position: this.player.value.position,
      socketId: socketId,
    });
  }

  getPlayerPosition() {
    return this.player.value.position;
  }

  setPlayer(player: Player) {
    this.player.next(player);
  }

  getPlayer() {
    return this.player.value;
  }
}
