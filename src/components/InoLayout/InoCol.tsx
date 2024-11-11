import React, { useState, useEffect } from 'react';
import { InoColProps } from './InoLayout.types';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';
import '../../styles/InoLayout.css';

export const InoCol: React.FC<InoColProps> = ({
  children,
  isActive = false,
  infinite = false,
  classNames = '',
  onActiveChange,
  onLeft,
  onRight,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    if (isActive && onActiveChange) {
      onActiveChange(activeIndex);
    }
  }, [isActive, activeIndex, onActiveChange]);

  const handleNavigation = (direction: 'up' | 'down') => {
    if (!isActive) return;

    setActiveIndex(prev => {
      if (direction === 'up') {
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
    onUp: () => handleNavigation('up'),
    onDown: () => handleNavigation('down'),
    onLeft,
    onRight,
  });

  return (
    <div className={`ino-col ${classNames}`}>
      {React.Children.map(children, (child, idx) => {
        if (React.isValidElement<InoColProps>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            isActive: isActive && idx === activeIndex,
            index: idx,
            classNames: `${child.props.classNames} ${classNames} ${
              isActive ? 'active' : ''
            }`,
          });
        }
        return child;
      })}
    </div>
  );
};
