import { MAP_SIZE } from '../consts';
import { DeepReadonly } from '../declarations';
import { Directions } from '../types/Tank';

import { TPlayerAction } from './messages';

type Tank = {
  playerId: string;
  position: { x: number; y: number };
  lastMoveTime: number;
  lastShootTime: number;
  health: number;
  direction: Directions;
  color: string;
};

type Block = {
  position: { x: number; y: number };
  destroyable: boolean;
};

type Entity = Block | Tank;

const isEmptySpot = (x: number, y: number, entities: Entity[]) => {
  const entityWithSameCoords = entities.find((entity) => {
    return entity.position.x === x && entity.position.y === y;
  });

  return !entityWithSameCoords;
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

export function __stubGameStateReducer(
  state: DeepReadonly<TGameState> & TGameState,
  playerId: string,
  action: TPlayerAction
): TGameState {
  const currentTank = state.tanks.find((tank) => tank.playerId === playerId);

  switch (action.type) {
    case 'fire':
      if (!currentTank || new Date().getTime() - currentTank.lastShootTime < 300) {
        return state;
      }

      let filterFunction: (x: number, y: number, max: { x: number; y: number }) => boolean = () => false;
      let maxValue: { x: number; y: number };

      if (currentTank.direction === Directions.up && currentTank.position.y > 0) {
        filterFunction = (x, y, max) => y < currentTank.position.y && x === currentTank.position.x && y > max.y;
        maxValue = { x: 0, y: 0 };
      } else if (currentTank.direction === Directions.down && currentTank.position.y < MAP_SIZE - 1) {
        filterFunction = (x, y, max) => y > currentTank.position.y && x === currentTank.position.x && y < max.y;
        maxValue = { x: MAP_SIZE - 1, y: MAP_SIZE - 1 };
      } else if (currentTank.direction === Directions.left && currentTank.position.x > 0) {
        filterFunction = (x, y, max) => x < currentTank.position.x && y === currentTank.position.y && x > max.x;
        maxValue = { x: 0, y: 0 };
      } else if (currentTank.direction === Directions.right && currentTank.position.y < MAP_SIZE - 1) {
        filterFunction = (x, y, max) => {
          return x > currentTank.position.x && y === currentTank.position.y && x < max.x;
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
          if (nearestObject.health === 1) {
            const filteredTanks = state.tanks.filter((tank) => tank.playerId !== nearestObject.playerId);

            return {
              ...state,
              tanks: filteredTanks.map((tank) => {
                if (currentTank.playerId === tank.playerId) {
                  return { ...tank, lastShootTime: new Date().getTime() };
                }

                return tank;
              }),
              isEnd: filteredTanks.length <= 1,
            };
          }

          return {
            ...state,
            tanks: state.tanks.map((tank) => {
              if (currentTank.playerId === tank.playerId) {
                return { ...tank, lastShootTime: new Date().getTime() };
              }

              return tank.playerId === nearestObject.playerId ? { ...tank, health: tank.health - 1 } : tank;
            }),
          };
        }

        if ('destroyable' in nearestObject && (nearestObject as Block).destroyable) {
          const newBlocks = state.blocks.filter((block) => block !== nearestObject);

          return {
            ...state,
            blocks: newBlocks,
            tanks: state.tanks.map((tank) => {
              return currentTank.playerId === tank.playerId ? { ...tank, lastShootTime: new Date().getTime() } : tank;
            }),
          };
        }
      }
      break;
    case 'move':
      if (!currentTank || new Date().getTime() - currentTank.lastMoveTime < 300) {
        return state;
      }

      if (action.direction === currentTank.direction) {
        const oldPosition = currentTank.position;
        let newPosition: { x: number; y: number } = currentTank.position;

        const allMapObjects = [...state.tanks, ...state.blocks];

        switch (action.direction) {
          case Directions.up:
            if (isEmptySpot(oldPosition.x, oldPosition.y - 1, allMapObjects)) {
              newPosition = oldPosition.y <= 0 ? oldPosition : { ...oldPosition, y: oldPosition.y - 1 };
            }
            break;
          case Directions.down:
            if (isEmptySpot(oldPosition.x, oldPosition.y + 1, allMapObjects)) {
              newPosition = oldPosition.y >= MAP_SIZE - 2 ? oldPosition : { ...oldPosition, y: oldPosition.y + 1 };
            }
            break;
          case Directions.left:
            if (isEmptySpot(oldPosition.x - 1, oldPosition.y, allMapObjects)) {
              newPosition = oldPosition.x <= 0 ? oldPosition : { ...oldPosition, x: oldPosition.x - 1 };
            }
            break;
          case Directions.right:
            if (isEmptySpot(oldPosition.x + 1, oldPosition.y, allMapObjects)) {
              newPosition = oldPosition.x >= MAP_SIZE - 1 ? oldPosition : { ...oldPosition, x: oldPosition.x + 1 };
            }
            break;
        }

        return {
          ...state,
          tanks: state.tanks.map((tank) =>
            tank === currentTank ? { ...currentTank, position: newPosition, lastMoveTime: new Date().getTime() } : tank
          ),
        };
      } else {
        return {
          ...state,
          tanks: state.tanks.map((tank) =>
            tank === currentTank
              ? { ...currentTank, direction: action.direction, lastMoveTime: new Date().getTime() }
              : tank
          ),
        };
      }
  }
  return state;
}
