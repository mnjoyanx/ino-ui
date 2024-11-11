import React from 'react';
import { InoTabProps } from './InoTab.types';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';
import { MouseKeyboardEvent } from '../../types';

export const InoTab: React.FC<InoTabProps> = ({
  label,
  isActive = false,
  disabled = false,
  index,
  classNames = '',
  variant = 'primary',
  size = 'medium',
  onClick,
  onLeft,
  onRight,
  onUp,
  onDown,
  onBack,
  onMouseEnter,
}) => {
  useMappedKeydown({
    isActive,
    onOk: onClick,
    onBack,
    onLeft,
    onRight,
    onUp,
    onDown,
    onMouseEnter,
    index,
  });

  return (
    <div
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      onClick={(e: React.MouseEvent) => {
        if (!disabled && onClick) {
          onClick(e as MouseKeyboardEvent, index);
        }
      }}
      onMouseEnter={(e: React.MouseEvent) => {
        if (onMouseEnter) {
          onMouseEnter(e as MouseKeyboardEvent, index);
        }
      }}
      className={`ino-tab ino-tab--${variant} ino-tab--${size} ${
        isActive ? 'ino-tab--active' : ''
      } ${disabled ? 'ino-tab--disabled' : ''} ${classNames}`}
    >
      {label}
    </div>
  );
};