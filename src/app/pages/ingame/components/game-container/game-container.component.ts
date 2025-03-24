import { Component } from '@angular/core';
import { MovementComponent } from '../UI/movement/movement.component';
import { PlayerComponent } from '../../../../../components/player/player.component';
import { PlayersConnectedComponent } from '../UI/players-connected/players-connected.component';
import { LevelComponent } from '../UI/level/level.component';
import { SpellBarComponent } from '../UI/spell-bar/spell-bar.component';
import { IngameChatComponent } from '../UI/ingame-chat/ingame-chat.component';
import { MapComponent } from '../../../../../components/map/map.component';

@Component({
  selector: 'app-game-container',
  imports: [
    MovementComponent,
    MapComponent,
    PlayersConnectedComponent,
    LevelComponent,
    SpellBarComponent,
    IngameChatComponent,
  ],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.scss',
})
export class GameContainerComponent {}
