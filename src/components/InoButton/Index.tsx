import React from 'react';
import { InoButtonProps } from './InoButton.types';
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
  size = 'medium',
  variant = 'primary',
  onLeft,
  onRight,
  onUp,
  onDown,
  onBack,
  onMouseEnter,
  ...rest
}) => {
  useMappedKeydown({
    isActive,
    onOk: (e, index) => {
      if (onClick) onClick(e, index);
    },
    onBack: (e, index) => {
      if (onBack) onBack(e, index);
    },
    onLeft: (e, index) => {
      if (onLeft) onLeft(e, index);
    },
    onRight: (e, index) => {
      if (onRight) onRight(e, index);
    },
    onUp: (e, index) => {
      if (onUp) onUp(e, index);
    },
    onDown: (e, index) => {
      if (onDown) onDown(e, index);
    },
    index,
  });

  return (
    <button
      type={type}
      onClick={e => {
        if (!disabled && onClick) {
          onClick(e, index);
        }
      }}
      onMouseEnter={e => {
        onMouseEnter && onMouseEnter(e, index);
      }}
      disabled={disabled}
      className={`ino-button ino-button--${variant} ino-button--${size} ${
        isActive ? 'ino-button--active' : ''
      } ${classNames}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default InoButton;
