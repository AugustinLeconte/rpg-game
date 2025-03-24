import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Player, PlayerService } from '../../services/player-service';
import { WebsocketService } from '../../services/websocket.service';
import { User, UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import {
  AnimationFrames,
  AnimationService,
} from '../../app/pages/ingame/services/animation.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  private player!: Player;
  user!: User;
  private userSubscription!: Subscription;
  private isMoving: boolean = false;
  private pressedKeys: Set<string> = new Set();

  @ViewChild('playerCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private spriteSheet = new Image();
  private frameIndex = 0;
  private skin = 'skin1';
  private action = 'walk';
  private frames: number[] = [];

  constructor(
    private playerService: PlayerService,
    private readonly wsService: WebsocketService,
    private userService: UserService,
    private animationService: AnimationService
  ) {}

  ngOnInit() {
    this.playerService.player$.subscribe((player) => {
      this.player = player;
    });
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngAfterViewInit() {
    /*this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.spriteSheet.src = '../../assets/sprites/sprite1.png';
    this.frames = this.animationService.getFrames(
      this.skin,
      this.action as keyof AnimationFrames
    );
    this.spriteSheet.onload = () => this.startAnimation();*/
  }

  /*startAnimation() {
    setInterval(() => {
      this.drawFrame(this.frames[this.frameIndex]);
      this.frameIndex = (this.frameIndex + 1) % this.frames.length;
    }, 100);
  }

  drawFrame(frame: number) {
    const frameWidth = 64,
      frameHeight = 64;
    const x = 0,
      y = 0;

    this.ctx.clearRect(x, y, frameWidth, frameHeight);
    this.ctx.drawImage(
      this.spriteSheet,
      frame * frameWidth,
      0,
      frameWidth,
      frameHeight,
      x,
      y,
      frameWidth,
      frameHeight
    );
  }*/

  private startMovingLoop() {
    if (this.isMoving) return;

    this.isMoving = true;
    const moveLoop = () => {
      if (this.pressedKeys.size === 0) {
        this.isMoving = false;
        return;
      }

      this.pressedKeys.forEach((key) => {
        this.sendMoveCommand(key);
        //this.startAnimation();
      });
      requestAnimationFrame(moveLoop);
    };
    requestAnimationFrame(moveLoop);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.pressedKeys.has(event.key)) {
      this.pressedKeys.add(event.key);
      this.startMovingLoop();
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    this.pressedKeys.delete(event.key);
    if (this.pressedKeys.size === 0) {
      this.sendStopCommand();
      this.isMoving = false;
    }
  }

  private sendMoveCommand(key: string) {
    const direction = this.getDirectionFromKey(key);
    if (direction) this.wsService.sendMove(this.player.socketId, direction);
  }

  private sendStopCommand() {
    this.wsService.sendMove('', '');
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
