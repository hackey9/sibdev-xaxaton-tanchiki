import { Directions, ITank } from '../types/Tank';

export class Tank implements ITank {
  health: number = 10;
  x: number = 0;
  y: number = 0;
  direction: Directions = Directions.up;

  constructor(x?: number, y?: number) {
    this.x = x ?? this.x;
    this.y = y ?? this.y;
  }
}
