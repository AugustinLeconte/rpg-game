import { Injectable } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { MapService } from './map-service';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  constructor(
    private readonly mapService: MapService,
    private readonly userService: UserService
  ) {}

  canInteract(): { canInteract: boolean; direction?: string } {
    const userIngame = this.userService.getUser().ingame;
    const mapData: string[][] = this.mapService.getMap();
    let approximateNewPos!: { x: number; y: number };
    if (userIngame && userIngame !== undefined)
      approximateNewPos = {
        ...userIngame?.position,
      };
    else return { canInteract: false };
    switch (userIngame?.direction) {
      case 'up':
        approximateNewPos.y -= 1;
        break;
      case 'down':
        approximateNewPos.y += 1;
        break;
      case 'left':
        approximateNewPos.x -= 1;
        break;
      case 'right':
        approximateNewPos.x += 1;
        break;
      default:
        break;
    }
    if (
      approximateNewPos.y >= 0 &&
      approximateNewPos.y < mapData.length &&
      approximateNewPos.x >= 0 &&
      approximateNewPos.x < mapData[0].length &&
      mapData[approximateNewPos.y][approximateNewPos.x] !== 'grass'
    ) {
      return { canInteract: true, direction: userIngame.direction };
    }
    return { canInteract: false };
  }
}
