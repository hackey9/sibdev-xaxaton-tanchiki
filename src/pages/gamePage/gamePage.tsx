import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { Controller, Tank } from '../../components';
import BrickWall from '../../components/brickWall/brickWall';
import Wall from '../../components/wall/wall';
import { IServer } from '../../model/client-server';
import { Directions } from '../../types/Tank';

import style from './gamePage.module.scss';

interface GamePageProps {
  onFire: VoidFunction;
  onMove: (action: Directions) => void;
  server: IServer;
}

const GamePage: FC<GamePageProps> = observer(({ onFire, onMove, server }) => {
  const { tanks, blocks } = server.state;

  useEffect(() => {
    // @ts-ignore
    window.server = server;
  }, [server]);

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
        </svg>

        <Controller onFire={onFire} onMove={onMove} />
      </div>
    </main>
  );
});

export default GamePage;
