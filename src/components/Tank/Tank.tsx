import { useState, FC } from 'react';

import { ITank } from '../../types/Tank';

const Tank: FC<ITank> = ({ x = 14, y = 14, direction, health = 3 }) => {
  const [state, setState] = useState({ x, y, direction: 'r' });

  return <rect x={state.x} y={state.y} width={1} height={1} fill="orange" />;
};

export default Tank;
