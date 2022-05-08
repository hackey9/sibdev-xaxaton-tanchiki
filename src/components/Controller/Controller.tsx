import { observer } from 'mobx-react-lite';
import { FC, SyntheticEvent, useEffect } from 'react';

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

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          onMove(Directions.up);
          break;
        case 'ArrowDown':
          onMove(Directions.down);
          break;
        case 'ArrowLeft':
          onMove(Directions.left);
          break;
        case 'ArrowRight':
          onMove(Directions.right);
          break;
        case ' ':
          onFire();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [onFire, onMove]);

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
