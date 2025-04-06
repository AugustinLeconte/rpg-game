import { Component } from '@angular/core';
import { MovementComponent } from '../UI/movement/movement.component';
import { PlayersConnectedComponent } from '../UI/players-connected/players-connected.component';
import { LevelComponent } from '../UI/level/level.component';
import { InventoryComponent } from '../UI/inventory/inventory.component';
import { IngameChatComponent } from '../UI/ingame-chat/ingame-chat.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-game-container',
  imports: [
    MovementComponent,
    MapComponent,
    PlayersConnectedComponent,
    LevelComponent,
    InventoryComponent,
    IngameChatComponent,
  ],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.scss',
})
export class GameContainerComponent {}
