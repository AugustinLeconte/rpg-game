import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Player, PlayerService } from '../../services/player-service';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  frameIndex = 0;
  isWalking = false;
  private player!: Player;

  constructor(
    private playerService: PlayerService,
    private readonly wsService: WebsocketService
  ) {}

  ngOnInit() {
    this.playerService.player$.subscribe((player) => {
      this.player = player;
    });
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

    if (keyMap[event.key] && !event.repeat && !this.isWalking) {
      this.isWalking = true;
      this.wsService.sendMove(this.player.socketId, keyMap[event.key]);
      setTimeout(() => (this.isWalking = false), 3000);
    }
  }

  updateAnimation() {
    if (this.isWalking) {
      this.frameIndex = (this.frameIndex + 1) % 4;
    }
  }
}
