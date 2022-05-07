import { useEffect } from 'react';
import { SyntheticEvent } from 'react';
import { FC } from 'react';

import { MAP_WIDTH } from '../../consts';

import { Directions, ITank } from '../../types/Tank';
import { IBlock } from '../../types/Wall';

import style from './Controller.module.scss';

const MAX_COORD = 14;

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

type TObjectsMap = ITank | IBlock;

interface ControllerProps {
  playerTank: ITank;
  setPlayerTank: (tank: ITank) => void;
  objectsMap: TObjectsMap[];
}

const Controller: FC<ControllerProps> = ({ playerTank, setPlayerTank, objectsMap }) => {
  const handleFireButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();

    // TODO: do fire handler
  };

  const checkOnObstacle = (nextX: number, nextY: number, direction: Directions) => {
    if (playerTank.direction !== direction) {
      return setPlayerTank({
        ...playerTank,
        direction,
      })
    }

    const entityWithTheSameCoords = objectsMap.find((tank) => {
      return tank.x === nextX && tank.y === nextY;
    })

    if (
      nextX > MAX_COORD
      || nextY > MAX_COORD
      || nextX < 0
      || nextY < 0
      || entityWithTheSameCoords
    ) return

    setPlayerTank({
      ...playerTank,
      x: nextX,
      y: nextY,
    })
  };

  const handleRightMove = () => {
    const newXCoord = playerTank.x + 1;
    checkOnObstacle(newXCoord, playerTank.y, Directions.right);
  };

  const handleLeftMove = () => {
    const newXCoord = playerTank.x - 1;
    checkOnObstacle(newXCoord, playerTank.y, Directions.left);
  };

  const handleUpMove = () => {
    const newYCoord = playerTank.y - 1;
    checkOnObstacle(playerTank.x, newYCoord, Directions.up);
  };

  const handleDownMove = () => {
    const newYCoord = playerTank.y + 1;
    checkOnObstacle(playerTank.x, newYCoord, Directions.down);
  };

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          handleUpMove();
          break;
        case 'ArrowDown':
          handleDownMove();
          break;
        case 'ArrowLeft':
          handleLeftMove();
          break;
        case 'ArrowRight':
          handleRightMove();
          break;
        default:
          break;
      }
    };

    window.addEventListener(('keyup'), handleKeyUp)

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [handleUpMove, handleDownMove, handleLeftMove, handleRightMove])

  return (
    <form className={style.controller} style={{ maxWidth: MAP_WIDTH }} onSubmit={handleFireButtonClick}>
      <button className={style.fireButton} type="submit" />
      <div className={style.stickWrapper}>
        <button type="button" onClick={handleUpMove} className={classNames(style.button, style.up)} />
        <button type="button" onClick={handleRightMove} className={classNames(style.button, style.right)} />
        <button type="button" onClick={handleDownMove} className={classNames(style.button, style.down)} />
        <button type="button" onClick={handleLeftMove} className={classNames(style.button, style.left)} />
      </div>
    </form>
  );
};

export default Controller;
