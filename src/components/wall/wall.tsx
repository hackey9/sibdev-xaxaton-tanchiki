import { FC } from 'react';

import { IBlock } from '../../types/Wall';

const Wall: FC<IBlock> = ({ x, y }) => {
  return <rect x={x} y={y} width={1} height={1} fill="#3b3838" />;
};

export default Wall;
