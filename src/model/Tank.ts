import { Directions, ITank } from '../types/Tank';

export class Tank implements ITank {
  health: number = 10;
  x: number = 0;
  y: number = 0;
  direction: Directions = Directions.up;
  color: string = 'yellow';

  constructor(x?: number, y?: number, direction?: Directions, color?: string) {
    this.x = x ?? this.x;
    this.y = y ?? this.y;
    this.direction = direction ?? this.direction;
    this.color = color ?? this.color
  }
}
