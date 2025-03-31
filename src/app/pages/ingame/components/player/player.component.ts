import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Player } from '../../services/player-service';
import { InteractionsComponent } from '../UI/interactions/interactions.component';

@Component({
  selector: 'app-player',
  imports: [InteractionsComponent],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  username: string = '';
  @Input() player!: Player;

  @ViewChild('playerCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
}
