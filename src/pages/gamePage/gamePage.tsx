import { useState } from 'react';

import { Controller, Tank } from '../../components';
import BrickWall from '../../components/brickWall/brickWall';
import Wall from '../../components/wall/wall';
import { MAP_WIDTH } from '../../consts';
import { Map } from '../../model/map';
import { Directions, ITank } from '../../types/Tank';

import style from './gamePage.module.scss';

const dummyPlayersTanksData = [
  {
    x: 5,
    y: 8,
    direction: Directions.down,
    health: 3,
    id: 1,
  },
  {
    x: 4,
    y: 12,
    direction: Directions.left,
    health: 3,
    id: 2,
  },
  {
    x: 13,
    y: 4,
    direction: Directions.right,
    health: 3,
    id: 3,
  },
];

const GamePage = () => {
  const [playerTank, setPlayerTank] = useState<ITank>({
    x: 3,
    y: 3,
    direction: Directions.up,
    health: 3,
  });

  const map = new Map(
    [
      { x: 0, y: 10, isDestructible: true, isDestructed: false },
      { x: 7, y: 1, isDestructible: true, isDestructed: false },
      { x: 9, y: 1, isDestructible: true, isDestructed: false },
      { x: 11, y: 1, isDestructible: true, isDestructed: false },
      { x: 13, y: 1, isDestructible: true, isDestructed: false },
      { x: 1, y: 4, isDestructible: true, isDestructed: false },

      { x: 1, y: 11, isDestructible: true, isDestructed: false },
      { x: 1, y: 12, isDestructible: true, isDestructed: false },
      { x: 1, y: 13, isDestructible: true, isDestructed: false },
      { x: 1, y: 14, isDestructible: true, isDestructed: false },

      { x: 5, y: 1, isDestructible: true, isDestructed: false },
      { x: 5, y: 2, isDestructible: true, isDestructed: false },
      { x: 5, y: 3, isDestructible: true, isDestructed: false },
      { x: 5, y: 5, isDestructible: true, isDestructed: false },

      { x: 5, y: 7, isDestructible: true, isDestructed: false },
      { x: 5, y: 8, isDestructible: true, isDestructed: false },
      { x: 5, y: 9, isDestructible: true, isDestructed: false },
      { x: 5, y: 10, isDestructible: true, isDestructed: false },

      { x: 4, y: 8, isDestructible: true, isDestructed: false },

      { x: 3, y: 7, isDestructible: true, isDestructed: false },
      { x: 3, y: 8, isDestructible: true, isDestructed: false },
      { x: 3, y: 9, isDestructible: true, isDestructed: false },
      { x: 3, y: 10, isDestructible: true, isDestructed: false },

      { x: 9, y: 1, isDestructible: true, isDestructed: false },
      { x: 9, y: 2, isDestructible: true, isDestructed: false },
      { x: 9, y: 3, isDestructible: true, isDestructed: false },
      { x: 9, y: 5, isDestructible: true, isDestructed: false },

      { x: 9, y: 7, isDestructible: true, isDestructed: false },
      { x: 9, y: 8, isDestructible: true, isDestructed: false },
      { x: 9, y: 9, isDestructible: true, isDestructed: false },
      { x: 9, y: 10, isDestructible: true, isDestructed: false },

      { x: 10, y: 8, isDestructible: true, isDestructed: false },

      { x: 11, y: 7, isDestructible: true, isDestructed: false },
      { x: 11, y: 8, isDestructible: true, isDestructed: false },
      { x: 11, y: 9, isDestructible: true, isDestructed: false },
      { x: 11, y: 10, isDestructible: true, isDestructed: false },

      { x: 13, y: 1, isDestructible: true, isDestructed: false },
      { x: 13, y: 2, isDestructible: true, isDestructed: false },
      { x: 13, y: 3, isDestructible: true, isDestructed: false },
      { x: 13, y: 4, isDestructible: true, isDestructed: false },

      { x: 13, y: 11, isDestructible: true, isDestructed: false },
      { x: 13, y: 12, isDestructible: true, isDestructed: false },
      { x: 13, y: 13, isDestructible: true, isDestructed: false },
      { x: 13, y: 14, isDestructible: true, isDestructed: false },
    ],
    [
      { x: 6, y: 2, isDestructible: false },
      { x: 6, y: 3, isDestructible: false },
      { x: 12, y: 13, isDestructible: false },
      { x: 12, y: 14, isDestructible: false },
      { x: 6, y: 8, isDestructible: false },
      { x: 7, y: 8, isDestructible: false },
      { x: 6, y: 9, isDestructible: false },
      { x: 7, y: 11, isDestructible: false },
    ],
    3,
    15
  );

  const { brickWalls, concreteWalls, tanks } = map.getMap();

  const nearestObject = map.getNearestObject(tanks[0]);

  return (
    <main className={style.main}>
      <svg viewBox="0 0 15 15" height={MAP_WIDTH} width={MAP_WIDTH} xmlns="http://www.w3.org/2000/svg">
        <rect height="100%" width="100%" fill="black" />

        {brickWalls.map((wall) => (
          <BrickWall {...wall} />
        ))}
        {concreteWalls.map((wall) => (
          <Wall {...wall} />
        ))}
        {tanks.map((tank) => (
          <Tank {...tank} />
        ))}

        {nearestObject && (
          <rect x={nearestObject.x + 0.25} y={nearestObject.y + 0.25} width={0.5} height={0.5} fill="red" />
        )}

        {/*<Tank direction={playerTank.direction} health={playerTank.health} x={playerTank.x} y={playerTank.y} />*/}
        {/*{dummyPlayersTanksData.map((tank) => (*/}
        {/*  <Tank key={tank.id} direction={tank.direction} health={tank.health} x={tank.x} y={tank.y} />*/}
        {/*))}*/}
      </svg>

      <Controller setPlayerTank={setPlayerTank} />
    </main>
  );
};

export default GamePage;
