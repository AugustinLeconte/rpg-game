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
  username: string = '';
  private userSubscription!: Subscription;

  @ViewChild('playerCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    private playerService: PlayerService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.playerService.player$.subscribe((player) => {
      this.player = player;
    });
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.username = user.username;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
