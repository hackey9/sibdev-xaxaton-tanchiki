import { SyntheticEvent } from 'react';
import { FC } from 'react';

import { MAP_WIDTH } from '../../consts';
import { ITank } from '../../types/Tank';

import style from './Controller.module.scss';

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

interface ControllerProps {
  setPlayerTank: (tank: ITank) => void;
}

const Controller: FC<ControllerProps> = ({ setPlayerTank }) => {
  const handleFireButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();

    // TODO: do fire handler
  };

  return (
    <form className={style.controller} style={{ maxWidth: MAP_WIDTH }} onSubmit={handleFireButtonClick}>
      <button className={style.fireButton} type="submit" />
      <div className={style.stickWrapper}>
        <button type="button" onClick={() => {}} className={classNames(style.button, style.up)} />
        <button type="button" onClick={() => {}} className={classNames(style.button, style.right)} />
        <button type="button" onClick={() => {}} className={classNames(style.button, style.down)} />
        <button type="button" onClick={() => {}} className={classNames(style.button, style.left)} />
      </div>
    </form>
  );
};

export default Controller;
