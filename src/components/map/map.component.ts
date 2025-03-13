import { Component } from '@angular/core';
import { MapService } from '../../services/map-service';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player-service';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-map',
  imports: [CommonModule, PlayerComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  mapData: string[][] = [];
  player = { x: 5, y: 5 };

  constructor(
    private mapService: MapService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.player = this.playerService.getPlayerPosition();
    window.addEventListener('keydown', (event) => this.handleKeyDown(event));

    this.mapService.fetchMap().subscribe((data) => {
      this.mapData = data;
    });
  }

  handleKeyDown(event: KeyboardEvent) {
    const keyMap: { [key: string]: string } = {
      ArrowUp: 'left',
      ArrowDown: 'right',
      ArrowLeft: 'up',
      ArrowRight: 'down',
    };

    if (keyMap[event.key]) {
      this.playerService.movePlayer(keyMap[event.key], this.mapData);
    }
  }
}
