import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { Controller, Tank } from '../../components';
import BrickWall from '../../components/brickWall/brickWall';
import HealthsBar from '../../components/HealthsBar';
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
  const { tanks, blocks, isEnd } = server.state;
  const playerId = server.id;

  const health = tanks.find((tank) => tank.playerId === playerId)?.health || 0;

  useEffect(() => {
    // @ts-ignore
    window.server = server;
  }, [server]);

  return (
    <main className={style.main}>
      <div className={style.mainMap}>
        <svg viewBox="0 0 17 17" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <rect height="100%" width="100%" fill="black" />

          {blocks
            .filter(({ destroyable }) => destroyable)
            .map(({ position }) => (
              <BrickWall x={position.x + 1} y={position.y + 1} />
            ))}
          {blocks
            .filter(({ destroyable }) => !destroyable)
            .map(({ position }) => (
              <Wall x={position.x + 1} y={position.y + 1} />
            ))}
          {tanks.map(({ position, direction, health, color }) => (
            <Tank x={position.x + 1} y={position.y + 1} health={health} direction={direction} color={color} />
          ))}

          {new Array(16).fill(0).map((_, index) => (
            <Wall x={index + 1} y={0} />
          ))}

          {new Array(16).fill(0).map((_, index) => (
            <Wall x={16} y={index + 1} />
          ))}

          {new Array(16).fill(0).map((_, index) => (
            <Wall x={index + 1} y={16} />
          ))}

          {new Array(17).fill(0).map((_, index) => (
            <Wall x={0} y={index} />
          ))}
        </svg>
        <HealthsBar health={health} />
        <Controller onFire={onFire} onMove={onMove} />
        {isEnd && <div className={style.endgame}>Endgame</div>}
      </div>
    </main>
  );
});

export default GamePage;
