import React from 'react';
import { NavigationArrowProps } from './ListView.types';

const ARROW_STYLES: React.CSSProperties = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
  cursor: 'pointer',
};

export const NavigationArrow: React.FC<NavigationArrowProps> = ({
  direction,
  icon,
  onClick,
  show,
  listType,
  style,
  classNames,
}) => {
  if (!show) return null;

  const getPositionStyles = (): React.CSSProperties => {
    if (listType === 'horizontal') {
      return {
        [direction === 'start' ? 'left' : 'right']: 0,
      };
    }
    return {
      [direction === 'start' ? 'top' : 'bottom']: 0,
    };
  };

  return (
    <div
      onClick={(e: React.MouseEvent) => onClick(e)}
      style={{
        ...ARROW_STYLES,
        ...getPositionStyles(),
        ...style,
      }}
      className={`ino-list-arrow ino-list-arrow-${direction} ${classNames ||
        ''}`}
    >
      <span className="ino-list-arrow-icon">{icon}</span>
    </div>
  );
};
