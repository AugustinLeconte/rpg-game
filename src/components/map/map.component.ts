import { Component } from '@angular/core';
import { MapService } from '../../services/map-service';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player-service';
import { PlayerComponent } from '../player/player.component';
import { WebsocketService } from '../../services/websocket.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {
  UserInterface,
  UserInterfaceService,
} from '../../services/user-interface.service';
import { PlayersConnectedComponent } from '../../app/pages/ingame/components/players-connected/players-connected.component';
import { LevelComponent } from '../../app/pages/ingame/components/level/level.component';
import { SpellBarComponent } from '../../app/pages/ingame/components/spell-bar/spell-bar.component';
import { IngameChatComponent } from '../../app/pages/ingame/components/ingame-chat/ingame-chat.component';

@Component({
  selector: 'app-map',
  imports: [
    CommonModule,
    PlayerComponent,
    FormsModule,
    PlayersConnectedComponent,
    LevelComponent,
    SpellBarComponent,
    IngameChatComponent,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  mapData: string[][] = [];
  player = { x: 5, y: 5 };
  private mapSubcription!: Subscription;
  private user: UserInterface = {} as UserInterface;

  constructor(
    private mapService: MapService,
    private wsService: WebsocketService,
    private playerService: PlayerService,
    private userService: UserInterfaceService
  ) {}

  connect() {}

  ngOnInit() {
    this.user = this.userService.getUser();
    if (!this.user) return;

    if (this.user.username.trim()) {
      this.wsService.joinGame(this.user.username);
    }

    this.mapSubcription = this.mapService.map$.subscribe((map) => {
      this.mapData = map;
    });

    this.player = this.playerService.getPlayerPosition();
  }

  ngOnDestroy() {
    this.mapSubcription.unsubscribe();
  }
}
