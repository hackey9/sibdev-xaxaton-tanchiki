export interface IBlock {
  isDestructible: boolean;
  x: number;
  y: number;
}

export interface BrickWall extends IBlock {
  isDestructed: boolean;
}
