import { Directions, ITank } from '../types/Tank';
import { BrickWall, IBlock } from '../types/Wall';

import { Tank } from './Tank';

export class Map {
  private brickWalls: BrickWall[];
  private concreteWalls: IBlock[];
  private tanks: ITank[] = [];
  private mapSize: number;

  constructor(brickWalls: BrickWall[], concreteWall: IBlock[], playersNumber: number, mapSize: number) {
    this.brickWalls = brickWalls;
    this.concreteWalls = concreteWall;
    this.mapSize = mapSize;

    if (playersNumber > 0 && playersNumber <= 4 && mapSize > 4) {
      // TODO: update coordinates and directions
      const tanksCoordinates = [
        { x: 0, y: 1, direction: Directions.down },
        { x: mapSize - 1, y: 0 },
        { x: mapSize - 1, y: mapSize - 1, direction: Directions.left },
        { x: 0, y: mapSize - 1 },
      ];

      this.tanks = tanksCoordinates.slice(0, playersNumber).map(({ x, y, direction }) => new Tank(x, y, direction));
    }
  }

  getMap() {
    return { brickWalls: this.brickWalls, concreteWalls: this.concreteWalls, tanks: this.tanks };
  }

  getNearestObject(tank: ITank) {
    let filterFunction: (x: number, y: number, max: { x: number; y: number }) => boolean = () => false;
    let maxValue: { x: number; y: number };

    if (tank.direction === Directions.up && tank.y > 0) {
      filterFunction = (x, y, max) => y < tank.y && x === tank.x && y > max.y;
      maxValue = { x: 0, y: 0 };
    } else if (tank.direction === Directions.down && tank.y < this.mapSize - 1) {
      filterFunction = (x, y, max) => y > tank.y && x === tank.x && y < max.y;
      maxValue = { x: this.mapSize - 1, y: this.mapSize - 1 };
    } else if (tank.direction === Directions.left && tank.x > 0) {
      filterFunction = (x, y, max) => x < tank.x && y === tank.y && x > max.x;
      maxValue = { x: 0, y: 0 };
    } else if (tank.direction === Directions.right && tank.y < this.mapSize - 1) {
      filterFunction = (x, y, max) => {
        return x > tank.x && y === tank.y && x < max.x;
      };
      maxValue = { x: this.mapSize - 1, y: this.mapSize - 1 };
    }

    const allMapObjects = [...this.brickWalls, ...this.concreteWalls, ...this.tanks];
    let nearestObjectIndex: number | null = null;

    allMapObjects.forEach((mapObject, index) => {
      if (filterFunction(mapObject.x, mapObject.y, maxValue)) {
        nearestObjectIndex = index;
        maxValue = { x: mapObject.x, y: mapObject.y };
      }
    });

    return nearestObjectIndex !== null ? allMapObjects[nearestObjectIndex] : null;
  }
}
