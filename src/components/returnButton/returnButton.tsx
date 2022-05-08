import { FC } from 'react';

import { ArrowIcon } from '../../assets/icons';
import Button from '../button/button';
import { ButtonProps, ButtonVariants } from '../button/types';

import styles from './returnButton.module.scss';

const ReturnButton: FC<{ className?: string; onClick?: VoidFunction } & ButtonProps> = ({ ...rest }) => {
  return <Button variant={ButtonVariants.pure} icon={<ArrowIcon className={styles.buttonIcon} />} {...rest} />;
};

export default ReturnButton;
