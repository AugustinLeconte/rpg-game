import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Player } from '../../services/player-service';
import { UserService } from '../../../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  username: string = '';
  private userSubscription!: Subscription;
  @Input() player!: Player;

  @ViewChild('playerCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.username = user.username;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
