import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { IBlock } from '../../types/Wall';

const BrickWall: FC<Omit<IBlock, 'isDestructible'>> = observer(({ x, y }) => {
  return (
    <>
      <rect x={x} y={y} width={1} height={1} fill="#722709" />
      <rect x={x + 0.15} y={y + 0.15} width={0.7} height={0.7} fill="#000" />
    </>
  );
});

export default BrickWall;
