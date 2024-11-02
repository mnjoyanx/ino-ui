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
  customStyle,
  className,
}) => {
  if (!show) return null;

  const getPositionStyles = (): React.CSSProperties => {
    if (listType === 'horizontal') {
      return {
        [direction === 'start' ? 'left' : 'right']: 0,
        height: '100%',
        width: '2rem',
      };
    }
    return {
      [direction === 'start' ? 'top' : 'bottom']: 0,
      width: '100%',
      height: '2rem',
    };
  };

  return (
    <div
      onClick={onClick}
      style={{
        ...ARROW_STYLES,
        ...getPositionStyles(),
        ...customStyle,
      }}
      className={`list-arrow list-arrow-${direction} ${className || ''}`}
    >
      {icon}
    </div>
  );
};
