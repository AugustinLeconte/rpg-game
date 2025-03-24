import { Injectable, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { MapService } from '../app/pages/ingame/services/map-service';
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

  setPlayers(player: Player) {
    this.player.next(player);
  }
}
