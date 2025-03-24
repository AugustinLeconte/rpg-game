import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Player, PlayerService } from '../../services/player-service';
import { WebsocketService } from '../../services/websocket.service';
import { User, UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  private player!: Player;
  user!: User;
  private userSubscription!: Subscription;

  @ViewChild('playerCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    private playerService: PlayerService,
    private readonly wsService: WebsocketService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.playerService.player$.subscribe((player) => {
      this.player = player;
    });
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.sendMoveCommand(event.key);
  }

  private sendMoveCommand(key: string) {
    const direction = this.getDirectionFromKey(key);
    if (direction) this.wsService.sendMove(this.player.socketId, direction);
  }

  private getDirectionFromKey(key: string): string | null {
    const directions: { [key: string]: string } = {
      ArrowUp: 'left',
      ArrowDown: 'right',
      ArrowLeft: 'up',
      ArrowRight: 'down',
      z: 'left',
      s: 'right',
      q: 'up',
      d: 'down',
    };

    return directions[key] || null;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
