import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Player {
  id: string;
  username: string;
  position: { x: number; y: number };
  skin?: string;
  lastDirection: 'up' | 'down' | 'left' | 'right';
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private players = new BehaviorSubject<Player[]>([]);
  players$ = this.players.asObservable();

  setPlayers(players: Player[]) {
    this.players.next(players);
  }

  getPlayerFromId(playerId: string): Player {
    return this.players.value.filter((player) => player.id == playerId)[0];
  }
}
