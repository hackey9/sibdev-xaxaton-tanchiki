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

  const { brickWalls, concreteWalls, tanks } = new Map(
    [{ x: 5, y: 1, isDestructible: true, isDestructed: false }],
    [{ x: 6, y: 3, isDestructible: false }],
    3
  ).getMap();

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
