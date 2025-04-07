import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Player } from '../../services/player-service';
import { InteractionsComponent } from '../UI/interactions/interactions.component';
import { AnimationService } from '../../services/animation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  imports: [InteractionsComponent, CommonModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  username: string = '';
  @Input() player!: Player;

  frameList: number[] = [];
  currentFrameIndex = 0;
  currentAction: 'walk' | 'idle' = 'idle';
  frameInterval: any;

  private lastPosition = { x: 0, y: 0 };

  constructor(private animationService: AnimationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['player']) {
      this.handleMovement();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.frameInterval);
  }

  handleMovement(): void {
    const { x, y } = this.player.position;
    const hasMoved = x !== this.lastPosition.x || y !== this.lastPosition.y;

    this.lastPosition = { x, y };

    this.currentAction = hasMoved ? 'walk' : 'idle';
    this.frameList = this.animationService.getFrames(
      this.player.skin ? this.player.skin : 'skin1',
      this.currentAction
    );
    this.currentFrameIndex = 0;

    if (hasMoved) {
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
  }

  startAnimation(): void {
    if (this.frameInterval) return;

    this.frameInterval = setInterval(() => {
      if (this.frameList.length > 0) {
        this.currentFrameIndex =
          (this.currentFrameIndex + 1) % this.frameList.length;
      }
    }, 150);
  }

  stopAnimation(): void {
    clearInterval(this.frameInterval);
    this.frameInterval = null;
  }

  getDirectionRow(): number {
    switch (this.player.lastDirection) {
      case 'down':
        return 2;
      case 'left':
        return 3;
      case 'right':
        return 0;
      case 'up':
        return 1;
      default:
        return 0;
    }
  }

  getBackgroundPosition(): string {
    const frame = this.frameList[this.currentFrameIndex] ?? 0;
    const frameWidth = 36;
    const frameHeight = 55;
    const x = -frame * frameWidth;
    const y = -this.getDirectionRow() * frameHeight;
    return `${x}px ${y}px`;
  }
}
