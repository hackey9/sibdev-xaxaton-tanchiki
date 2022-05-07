import classNames from 'classnames';
import { FC, HTMLProps } from 'react';

import styles from './button.module.scss';
import { ButtonProps, ButtonVariants } from './types';

const Button: FC<ButtonProps & HTMLProps<HTMLButtonElement>> = ({
  variant = ButtonVariants.default,
  icon,
  className,
  type,
  children,
  ...rest
}) => {
  return (
    <button
      className={classNames(styles.button, variant === ButtonVariants.pure && styles.buttonPure, className)}
      {...rest}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
