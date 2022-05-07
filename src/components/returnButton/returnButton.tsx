import { FC } from 'react';

import { ArrowIcon } from '../../assets/icons';
import Button from '../button/button';
import { ButtonProps } from '../button/types';

import styles from './returnButton.module.scss';

const ReturnButton: FC<{ to?: string; className?: string } & ButtonProps> = ({ to, className, ...rest }) => {
  //  TODO: add 'to'
  return <Button className={className} icon={<ArrowIcon className={styles.buttonIcon} />} {...rest} />;
};

export default ReturnButton;
