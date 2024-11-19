import React from 'react';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';
import { MouseKeyboardEvent } from '../../types';
import { InoTabProps } from './InoTab.types';

export const InoTab: React.FC<InoTabProps> = ({
  label,
  isActive = false,
  isSelected = false,
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
    index,
  });

  return (
    <div
      role="tab"
      aria-selected={isSelected}
      aria-disabled={disabled}
      onClick={(e: React.MouseEvent) => {
        if (!disabled && onClick) {
          onClick(e as MouseKeyboardEvent, index);
        }
      }}
      onMouseEnter={(e: React.MouseEvent) => {
        if (onMouseEnter) {
          onMouseEnter(e, index);
        }
      }}
      className={`ino-tab ino-tab--${variant} ino-tab--${size} 
          ${isActive ? 'ino-tab--active' : ''} 
          ${isSelected ? 'ino-tab--selected' : ''} 
          ${disabled ? 'ino-tab--disabled' : ''} 
          ${classNames}`}
    >
      {label}
    </div>
  );
};
