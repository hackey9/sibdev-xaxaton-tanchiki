import { observer } from 'mobx-react-lite';
import { FC, SyntheticEvent } from 'react';

import { TriangleArrowIcon } from '../../assets/icons';
import { MAP_WIDTH } from '../../consts';
import { Directions } from '../../types/Tank';

import style from './Controller.module.scss';

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

interface ControllerProps {
  onFire: VoidFunction;
  onMove: (direction: Directions) => void;
}

const Controller: FC<ControllerProps> = observer(({ onFire, onMove }) => {
  const handleFireButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();

    onFire();
  };

  // const checkOnObstacle = (nextX: number, nextY: number, direction: Directions) => {
  //   if (playerTank.direction !== direction) {
  //     return setPlayerTank({
  //       ...playerTank,
  //       direction,
  //     });
  //   }
  //
  //   const entityWithTheSameCoords = objectsMap.find((tank) => {
  //     return tank.x === nextX && tank.y === nextY;
  //   });
  //
  //   if (nextX > MAX_COORD || nextY > MAX_COORD || nextX < 0 || nextY < 0 || entityWithTheSameCoords) return;
  //
  //   setPlayerTank({
  //     ...playerTank,
  //     x: nextX,
  //     y: nextY,
  //   });
  // };

  // const handleRightMove = () => {
  // const newXCoord = playerTank.x + 1;
  // checkOnObstacle(newXCoord, playerTank.y, Directions.right);
  // };

  // const handleLeftMove = () => {
  // const newXCoord = playerTank.x - 1;
  // checkOnObstacle(newXCoord, playerTank.y, Directions.left);
  // };

  // const handleUpMove = () => {
  // const newYCoord = playerTank.y - 1;
  // checkOnObstacle(playerTank.x, newYCoord, Directions.up);
  // };

  // const handleDownMove = () => {
  // const newYCoord = playerTank.y + 1;
  // checkOnObstacle(playerTank.x, newYCoord, Directions.down);
  // };

  // useEffect(() => {
  //   const handleKeyUp = (e: KeyboardEvent) => {
  //     switch (e.key) {
  //       case 'ArrowUp':
  //         handleUpMove();
  //         break;
  //       case 'ArrowDown':
  //         handleDownMove();
  //         break;
  //       case 'ArrowLeft':
  //         handleLeftMove();
  //         break;
  //       case 'ArrowRight':
  //         handleRightMove();
  //         break;
  //       default:
  //         break;
  //     }
  //   };
  //
  //   window.addEventListener('keyup', handleKeyUp);
  //
  //   return () => window.removeEventListener('keyup', handleKeyUp);
  // }, [handleUpMove, handleDownMove, handleLeftMove, handleRightMove]);

  return (
    <form className={style.controller} style={{ maxWidth: MAP_WIDTH }} onSubmit={handleFireButtonClick}>
      <button className={style.fireButton} type="submit">
        fire
      </button>
      <div className={style.stickWrapper}>
        <button type="button" onClick={() => onMove(Directions.up)} className={classNames(style.button, style.up)}>
          <TriangleArrowIcon className={style.arrowIcon} />
        </button>
        <button
          type="button"
          onClick={() => onMove(Directions.right)}
          className={classNames(style.button, style.right)}
        >
          <TriangleArrowIcon className={style.arrowIcon} />
        </button>
        <button type="button" onClick={() => onMove(Directions.down)} className={classNames(style.button, style.down)}>
          <TriangleArrowIcon className={style.arrowIcon} />
        </button>
        <button type="button" onClick={() => onMove(Directions.left)} className={classNames(style.button, style.left)}>
          <TriangleArrowIcon className={style.arrowIcon} />
        </button>
      </div>
    </form>
  );
});

export default Controller;
