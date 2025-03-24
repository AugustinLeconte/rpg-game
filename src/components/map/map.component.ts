import { Component } from '@angular/core';
import { MapService } from '../../app/pages/ingame/services/map-service';
import { CommonModule } from '@angular/common';
import { Player, PlayerService } from '../../services/player-service';
import { PlayerComponent } from '../player/player.component';
import { WebsocketService } from '../../services/websocket.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-map',
  imports: [CommonModule, PlayerComponent, FormsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  mapData: string[][] = [];
  player!: Player;
  private mapSubcription!: Subscription;
  private playerSubcription!: Subscription;
  private userSubscription!: Subscription;
  private user!: User;

  constructor(
    private mapService: MapService,
    private wsService: WebsocketService,
    private playerService: PlayerService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.user = user;
    });

    this.mapSubcription = this.mapService.map$.subscribe((map) => {
      this.mapData = map;
    });

    this.playerSubcription = this.playerService.player$.subscribe((player) => {
      this.player = player;
    });

    if (!this.user) return;
    if (this.user.username && this.user.username.trim()) {
      this.wsService.joinGame(this.user.username);
    } else this.wsService.joinGame('New Player');
  }

  ngOnDestroy() {
    this.playerSubcription.unsubscribe();
    this.mapSubcription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
