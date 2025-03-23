import { Injectable } from '@angular/core';

export interface AnimationFrames {
  walk: number[];
  run: number[];
}
@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private animations: Record<string, AnimationFrames> = {
    skin1: { walk: [0, 1, 2, 3], run: [4, 5, 6, 7] },
    skin2: { walk: [8, 9, 10, 11], run: [12, 13, 14, 15] },
  };

  getFrames(skin: string, action: keyof AnimationFrames): number[] {
    return this.animations[skin]?.[action] || [];
  }
}
