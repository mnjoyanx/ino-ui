import React from 'react';
import useKeydown from '../../hooks/useKeydown';
import { InoButtonProps } from './InoButton.types';
import '../../styles/InoButton.css';

export const InoButton: React.FC<InoButtonProps> = ({
  isActive = true,
  index,
  children,
  onClick,
  type = 'button',
  disabled = false,
  classNames = '',
  variant = 'primary', // Add default variant
  onLeft,
  onRight,
  onUp,
  onDown,
  onBack,
  ...rest
}) => {
  useKeydown({
    isActive,
    ok: e => {
      if (!disabled && onClick) {
        onClick({ e }, index);
      }
    },
    left: e => {
      if (onLeft) {
        onLeft({ e }, index);
      }
    },
    right: e => {
      if (onRight) {
        onRight({ e }, index);
      }
    },
    up: e => {
      if (onUp) {
        onUp({ e }, index);
      }
    },
    down: e => {
      if (onDown) {
        onDown({ e }, index);
      }
    },
    back: e => {
      if (onBack) {
        onBack({ e }, index);
      }
    },
  });

  return (
    <button
      type={type}
      onClick={e => {
        if (!disabled && onClick) {
          onClick({ e }, index);
        }
      }}
      disabled={disabled}
      className={`ino-button ino-button--${variant} ${
        isActive ? 'ino-button--active' : ''
      } ${classNames}`}
      {...rest}
    >
      <span className="ino-button__text">{children}</span>
    </button>
  );
};

export default InoButton;
