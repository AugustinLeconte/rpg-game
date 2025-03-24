import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MapService } from '../../services/map-service';
import { CommonModule } from '@angular/common';
import { Player, PlayerService } from '../../services/player-service';
import { PlayerComponent } from '../player/player.component';
import { WebsocketService } from '../../../../../services/websocket.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-map',
  imports: [CommonModule, PlayerComponent, FormsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapComponent {
  mapData: string[][] = [];
  players!: Player[];
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

    this.playerSubcription = this.playerService.players$.subscribe(
      (players) => {
        this.players = players;
      }
    );

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
