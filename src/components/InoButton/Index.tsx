import React from 'react';
import { InoButtonProps } from './InoButton.types';
import { MouseKeyboardEvent } from '../../types';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';

import '../../styles/InoButton.css';

export const InoButton: React.FC<InoButtonProps> = ({
  isActive = true,
  index,
  children,
  onClick,
  type = 'button',
  disabled = false,
  classNames = '',
  variant = 'primary',
  onLeft,
  onRight,
  onUp,
  onDown,
  onBack,
  onFocus,
  onMouseEnter,
  ...rest
}) => {
  useMappedKeydown({
    isActive,
    onOk: onClick,
    onBack: onBack,
    onLeft: onLeft,
    onRight: onRight,
    onUp: onUp,
    onDown: onDown,
    onMouseEnter: onMouseEnter,
    index,
  });

  return (
    <button
      type={type}
      onClick={e => {
        if (!disabled && onClick) {
          onClick(e as MouseKeyboardEvent, index);
        }
      }}
      onMouseEnter={e => {
        onMouseEnter && onMouseEnter(e as MouseKeyboardEvent, index);
      }}
      disabled={disabled}
      className={`ino-button ino-button--${variant} ${
        isActive ? 'ino-button--active' : ''
      } ${classNames}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default InoButton;
