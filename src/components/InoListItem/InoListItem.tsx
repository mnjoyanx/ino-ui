import React from 'react';
import { InoListItemProps } from './InoListItem.types';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';
import '../../styles/InoListItem.css';

export const InoListItem: React.FC<InoListItemProps> = ({
  children,
  isActive = false,
  disabled = false,
  icon,
  rightContent,
  className = '',
  index,
  onClick,
  onUp,
  onDown,
  onLeft,
  onOk,
  onRight,
}) => {
  useMappedKeydown({
    isActive,
    onOk,
    onUp,
    onDown,
    onLeft,
    onRight,
  });

  return (
    <div
      className={`ino-list-item ${isActive ? 'active' : ''} ${
        disabled ? 'disabled' : ''
      } ${className}`}
      onClick={e => !disabled && onClick?.(e, index)}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {icon && <div className="ino-list-item__icon">{icon}</div>}
      <div className="ino-list-item__content">{children}</div>
      {rightContent && (
        <div className="ino-list-item__right">{rightContent}</div>
      )}
    </div>
  );
};
