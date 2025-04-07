import { Injectable } from '@angular/core';

export interface AnimationFrames {
  walk: number[];
  idle: number[];
}
@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private animations: Record<string, AnimationFrames> = {
    skin1: { walk: [0, 1, 2], idle: [4, 5, 6] },
    skin2: { walk: [8, 9, 10], idle: [12, 13, 14] },
  };

  getFrames(skin: string, action: keyof AnimationFrames): number[] {
    return this.animations[skin]?.[action] || [];
  }
}
