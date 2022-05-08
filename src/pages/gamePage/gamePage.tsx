import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

import { Controller, Tank } from '../../components';
import BrickWall from '../../components/brickWall/brickWall';
import Wall from '../../components/wall/wall';
import { IServer } from '../../model/client-server';
import { Directions, ITank } from '../../types/Tank';

import style from './gamePage.module.scss';

interface GamePageProps {
  onFire: VoidFunction;
  server: IServer;
}

const GamePage: FC<GamePageProps> = observer(({ onFire, server }) => {
  const { tanks, blocks } = server.state;

  return (
    <main className={style.main}>
      <div className={style.mainMap}>
        <svg viewBox="0 0 15 16" height={400} width={400} xmlns="http://www.w3.org/2000/svg">
          <rect height="100%" width="100%" fill="black" />

          {blocks
            .filter(({ destroyable }) => destroyable)
            .map(({ position, destroyable }) => (
              <BrickWall x={position.x} y={position.y} isDestructible={destroyable} />
            ))}
          {blocks
            .filter(({ destroyable }) => !destroyable)
            .map(({ position, destroyable }) => (
              <Wall x={position.x} y={position.y} isDestructible={destroyable} />
            ))}
          {tanks.map(({ position, direction, health }) => (
            <Tank x={position.x} y={position.y} health={health} direction={direction} />
          ))}

          {new Array(15).fill(0).map((_, index) => (
            <Wall isDestructible={false} x={index} y={15} />
          ))}

          {/*<Tank direction={playerTank.direction} health={playerTank.health} x={playerTank.x} y={playerTank.y} />*/}
        </svg>

        {/*<Controller playerTank={playerTank} setPlayerTank={setPlayerTank} objectsMap={objectsMap} onFire={onFire} />*/}
      </div>
    </main>
  );
});

export default GamePage;
