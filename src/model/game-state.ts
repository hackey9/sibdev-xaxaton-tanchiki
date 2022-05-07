import { MAP_SIZE } from '../consts';
import { Directions } from '../types/Tank';

import { TPlayerAction } from './messages';

type Tank = {
  playerId: string;
  position: { x: number; y: number };
  lastMoveTime: number;
  health: number;
  direction: Directions;
};

type Block = {
  position: { x: number; y: number };
  destroyable: boolean;
};

export interface TGameState {
  // TODO
  blocks: Array<Block>;
  tanks: Array<Tank>;
  // hits: [];
  isEnd: boolean;
}

export interface IGameStateReducer {
  (state: TGameState, playerId: string, action: TPlayerAction): TGameState;
}

export function __stubGameStateReducer(state: TGameState, playerId: string, action: TPlayerAction): TGameState {
  switch (action.type) {
    case 'fire':
      const tank = state.tanks.find((tank) => tank.playerId === playerId);

      if (!tank) {
        return state;
      }

      let filterFunction: (x: number, y: number, max: { x: number; y: number }) => boolean = () => false;
      let maxValue: { x: number; y: number };

      if (tank.direction === Directions.up && tank.position.y > 0) {
        filterFunction = (x, y, max) => y < tank.position.y && x === tank.position.x && y > max.y;
        maxValue = { x: 0, y: 0 };
      } else if (tank.direction === Directions.down && tank.position.y < MAP_SIZE - 1) {
        filterFunction = (x, y, max) => y > tank.position.y && x === tank.position.x && y < max.y;
        maxValue = { x: MAP_SIZE - 1, y: MAP_SIZE - 1 };
      } else if (tank.direction === Directions.left && tank.position.x > 0) {
        filterFunction = (x, y, max) => x < tank.position.x && y === tank.position.y && x > max.x;
        maxValue = { x: 0, y: 0 };
      } else if (tank.direction === Directions.right && tank.position.y < MAP_SIZE - 1) {
        filterFunction = (x, y, max) => {
          return x > tank.position.x && y === tank.position.y && x < max.x;
        };
        maxValue = { x: MAP_SIZE - 1, y: MAP_SIZE - 1 };
      }

      const allMapObjects = [...state.tanks, ...state.blocks];
      let nearestObjectIndex: number | null = null;

      allMapObjects.forEach((mapObject, index) => {
        if (filterFunction(mapObject.position.x, mapObject.position.y, maxValue)) {
          nearestObjectIndex = index;
          maxValue = { x: mapObject.position.x, y: mapObject.position.y };
        }
      });

      if (nearestObjectIndex !== null) {
        const nearestObject = allMapObjects[nearestObjectIndex];

        if ('health' in nearestObject && (nearestObject as Tank).health) {
          return {
            ...state,
            tanks: state.tanks.map((tank) =>
              tank.playerId === nearestObject.playerId ? { ...tank, health: tank.health - 1 } : tank
            ),
          };
        }

        if ('destroyable' in nearestObject && (nearestObject as Block).destroyable) {
          return {
            ...state,
            blocks: state.blocks.filter(
              ({ position }) => position.x !== nearestObject.position.x && position.y !== nearestObject.position.y
            ),
          };
        }
      }
  }
  return state;
}
