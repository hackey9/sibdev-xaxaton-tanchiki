export enum Directions {
  up,
  down,
  right,
  left,
}

export interface ITank {
  direction: Directions;
  x: number;
  y: number;
  health: number;
}
