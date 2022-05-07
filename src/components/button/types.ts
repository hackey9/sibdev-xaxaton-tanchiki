import { ReactElement } from 'react';

export enum ButtonVariants {
  default = 'default',
  pure = 'pure',
}

export interface ButtonProps {
  icon?: ReactElement;
  variant?: ButtonVariants;
}
