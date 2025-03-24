import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Player } from '../../services/player-service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  username: string = '';
  @Input() player!: Player;

  @ViewChild('playerCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
}
