import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player } from '../../../../../services/player-service';
import { Observable, Subscription } from 'rxjs';
import { WebsocketService } from '../../../../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-players-connected',
  imports: [CommonModule, FormsModule],
  templateUrl: './players-connected.component.html',
  styleUrl: './players-connected.component.scss',
})
export class PlayersConnectedComponent implements OnInit, OnDestroy {
  players: any[] = {} as any[];
  showPlayersConnected: boolean = false;
  wsSubscription!: Subscription;

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    window.addEventListener('keydown', (event) => this.handleKeyPressed(event));

    this.wsSubscription = this.wsService.players$.subscribe((players) => {
      this.players = players;
    });
  }

  handleKeyPressed(event: KeyboardEvent) {
    if (event.key == 'c') {
      this.showPlayersConnected = !this.showPlayersConnected;
    }
  }

  ngOnDestroy(): void {
    this.wsSubscription.unsubscribe();
  }
}
