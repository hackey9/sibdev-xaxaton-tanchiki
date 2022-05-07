import { useMemo } from 'react';
import { FC } from 'react';

import { Directions, ITank } from '../../types/Tank';

const Tank: FC<ITank> = ({ x, y, direction }) => {
  const coords = useMemo(() => {
    switch (direction) {
      case Directions.down:
        return {
          figure: `${x + 0.1} ${y}, ${x + 0.9} ${y}, ${x + 0.9} ${y + 0.7}, ${x + 0.1} ${y + 0.7}`,
          muzzle: {
            x1: x + 0.5,
            x2: x + 0.5,
            y1: y + 0.5,
            y2: y + 1,
          },
        };
      case Directions.left:
        return {
          figure: `${x + 0.3} ${y + 0.1}, ${x + 1} ${y + 0.1}, ${x + 1} ${y + 0.9}, ${x + 0.3} ${y + 0.9}`,
          muzzle: {
            x1: x,
            x2: x + 0.5,
            y1: y + 0.5,
            y2: y + 0.5,
          },
        };
      case Directions.right:
        return {
          figure: `${x} ${y + 0.1}, ${x + 0.7} ${y + 0.1}, ${x + 0.7} ${y + 0.9}, ${x} ${y + 0.9}`,
          muzzle: {
            x1: x + 0.5,
            x2: x + 1,
            y1: y + 0.5,
            y2: y + 0.5,
          },
        };
      case Directions.up:
        return {
          figure: `${x + 0.1} ${y + 0.3}, ${x + 0.9} ${y + 0.3}, ${x + 0.9} ${y + 1}, ${x + 0.1} ${y + 1}`,
          muzzle: {
            x1: x + 0.5,
            x2: x + 0.5,
            y1: y,
            y2: y + 0.5,
          },
        };
      default:
        break;
    }
  }, [direction, x, y]);

  return (
    <>
      <polygon points={coords?.figure} fill="orange" />
      <line
        x1={coords?.muzzle.x1}
        y1={coords?.muzzle.y1}
        x2={coords?.muzzle.x2}
        y2={coords?.muzzle.y2}
        stroke="orange"
        strokeWidth="0.25"
      />
    </>
  );
};

export default Tank;
