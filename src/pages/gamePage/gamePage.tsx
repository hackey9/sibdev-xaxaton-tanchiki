import { FC, useState } from 'react';

import { Controller, Tank } from '../../components';
import BrickWall from '../../components/brickWall/brickWall';
import Wall from '../../components/wall/wall';
import { IServer } from '../../model/client-server';
import { Map } from '../../model/map';
import { Directions, ITank } from '../../types/Tank';

import style from './gamePage.module.scss';

const GamePage: FC<{ onFire: VoidFunction }> = ({ onFire }) => {
  const [playerTank, setPlayerTank] = useState<ITank>({
    x: 2,
    y: 2,
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

  const objectsMap = [brickWalls, concreteWalls, tanks].flat();

  return (
    <main className={style.main}>
      <div className={style.mainMap}>
        <svg viewBox="0 0 15 16" height={400} width={400} xmlns="http://www.w3.org/2000/svg">
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

          {new Array(15).fill(0).map((_, index) => (
            <Wall isDestructible={false} x={index} y={15} />
          ))}

          <Tank direction={playerTank.direction} health={playerTank.health} x={playerTank.x} y={playerTank.y} />
        </svg>
        <Controller playerTank={playerTank} setPlayerTank={setPlayerTank} objectsMap={objectsMap} onFire={onFire} />
      </div>
    </main>
  );
};

export default GamePage;
