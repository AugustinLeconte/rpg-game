import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player-service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() x!: number;
  @Input() y!: number;
  frameIndex = 0;
  isWalking = false;

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    //setInterval(() => this.updateAnimation(), 200);
    window.addEventListener('keydown', (event) => this.handleKeyDown(event));
  }

  handleKeyDown(event: KeyboardEvent) {
    const keyMap: { [key: string]: string } = {
      ArrowUp: 'left',
      ArrowDown: 'right',
      ArrowLeft: 'up',
      ArrowRight: 'down',
    };
    event.preventDefault();

    if (keyMap[event.key]) {
      //this.isWalking = true;
      this.playerService.movePlayer(keyMap[event.key]);
      //setTimeout(() => (this.isWalking = false), 10);
    }
  }

  updateAnimation() {
    if (this.isWalking) {
      this.frameIndex = (this.frameIndex + 1) % 4;
    }
  }
}
