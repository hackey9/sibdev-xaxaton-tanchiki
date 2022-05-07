import { FC } from 'react';

import { IBlock } from '../../types/Wall';

const Wall: FC<IBlock> = ({ x, y }) => {
  return (
    <>
      <rect x={x} y={y} width={1} height={1} fill="#3b3838" />
      <rect x={x + 0.15} y={y + 0.15} width={0.7} height={0.7} fill="#000" />
      <line x1={x + 0.9} x2={x + 0.1} y1={y + 0.9} y2={y + 0.1} strokeWidth={0.15} stroke="#3b3838" />
    </>
  );
};

export default Wall;
