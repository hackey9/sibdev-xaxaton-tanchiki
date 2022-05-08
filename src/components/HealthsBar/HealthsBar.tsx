import { FC } from 'react';

import { HearthIcon } from '../../assets/icons';

import style from './HealthsBar.module.scss';

interface HealthsBarProps {
  health: number;
}

const Controller: FC<HealthsBarProps> = ({ health }) => {
  return <section className={style.wrapper}>{Array(health).fill(<HearthIcon />)}</section>;
};

export default Controller;
