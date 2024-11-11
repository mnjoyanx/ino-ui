import React, { useState, useEffect } from 'react';
import { InoRowProps } from './InoLayout.types';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';
import '../../styles/InoLayout.css';

export const InoRow: React.FC<InoRowProps> = ({
  children,
  isActive = false,
  infinite = false,
  classNames = '',
  onActiveChange,
  onUp,
  onDown,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    if (isActive && onActiveChange) {
      onActiveChange(activeIndex);
    }
  }, [isActive, activeIndex, onActiveChange]);

  const handleNavigation = (direction: 'left' | 'right') => {
    if (!isActive) return;

    setActiveIndex(prev => {
      if (direction === 'left') {
        if (prev === 0 && infinite) {
          return childrenArray.length - 1;
        }
        return Math.max(0, prev - 1);
      } else {
        if (prev === childrenArray.length - 1 && infinite) {
          return 0;
        }
        return Math.min(childrenArray.length - 1, prev + 1);
      }
    });
  };

  useMappedKeydown({
    isActive,
    onLeft: () => handleNavigation('left'),
    onRight: () => handleNavigation('right'),
    onUp,
    onDown,
  });

  return (
    <div className={`ino-row ${classNames}`}>
      {React.Children.map(children, (child, idx) => {
        if (React.isValidElement<InoRowProps & { className: string }>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            isActive: isActive && idx === activeIndex,
            index: idx,
            className: `${child.props.classNames} ${classNames} ${
              isActive && !child.props.classNames?.includes('active')
                ? 'active'
                : ''
            }`,
          });
        }
        return child;
      })}
    </div>
  );
};
