import { FC } from 'react';

import { BrickWall as BrickWallType } from '../../types/Wall';

const BrickWall: FC<BrickWallType> = ({ x, y, isDestructed }) => {
  if (isDestructed) {
    return null;
  }

  return <rect x={x} y={y} width={1} height={1} fill="#722709" />;
};

export default BrickWall;
