import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  player = { x: 5, y: 5 };

  constructor() {}

  getPlayerPosition() {
    return this.player;
  }

  movePlayer(direction: string, mapData: string[][]) {
    let newX = this.player.x;
    let newY = this.player.y;

    switch (direction) {
      case 'up':
        newY--;
        break;
      case 'down':
        newY++;
        break;
      case 'left':
        newX--;
        break;
      case 'right':
        newX++;
        break;
    }

    if (
      newY >= 0 &&
      newY < mapData.length &&
      newX >= 0 &&
      newX < mapData[0].length &&
      mapData[newY][newX] !== 'water'
    ) {
      this.player.x = newX;
      this.player.y = newY;
    }
  }
}
