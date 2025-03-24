import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User, UserService } from '../../../../../../services/user.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../../../../../services/websocket.service';

@Component({
  selector: 'app-movement',
  imports: [],
  templateUrl: './movement.component.html',
  styleUrl: './movement.component.scss',
})
export class MovementComponent implements OnInit, OnDestroy {
  user!: User;
  private userSubscription!: Subscription;

  @ViewChild('playerCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    private readonly wsService: WebsocketService,
    private userService: UserService
  ) {}

  ngOnInit() {
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
    if (direction && this.user.socketId)
      this.wsService.sendMove(this.user.socketId, direction);
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
