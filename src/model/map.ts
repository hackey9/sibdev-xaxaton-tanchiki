import { ITank } from '../types/Tank';
import { BrickWall, IBlock } from '../types/Wall';

import { Tank } from './Tank';

export class Map {
  private brickWalls: BrickWall[];
  private concreteWall: IBlock[];
  private tanks: ITank[];

  constructor(brickWalls: BrickWall[], concreteWall: IBlock[], playersNumber: number) {
    this.brickWalls = brickWalls;
    this.concreteWall = concreteWall;
    // TODO: replace
    // this.tanks = playersNumber > 0 ? new Array(playersNumber).fill(new Tank()) : [];
    this.tanks = [new Tank(0, 0), new Tank(1, 0), new Tank(2, 0)];
  }

  getMap() {
    return { brickWalls: this.brickWalls, concreteWalls: this.concreteWall, tanks: this.tanks };
  }
}
