import React, { useState, useEffect } from 'react';
import { InoRowProps } from './InoLayout.types';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';
import { InoElementWrapper } from './InoElementWrapper';
import '../../styles/InoLayout.css';

export const InoRow: React.FC<InoRowProps> = ({
  children,
  isActive = false,
  infinite = false,
  classNames = '',
  onActiveChange,
  onUp,
  onDown,
  onLeft,
  onRight,
  onOk,
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
    onLeft: e => {
      if (activeIndex === 0 && !infinite && onLeft) {
        onLeft(e, activeIndex);
      } else {
        handleNavigation('left');
      }
    },
    onRight: e => {
      if (activeIndex === childrenArray.length - 1 && !infinite && onRight) {
        onRight(e, activeIndex);
      } else {
        handleNavigation('right');
      }
    },
    onUp,
    onDown,
    onOk,
  });

  return (
    <div className={`ino-row ${classNames}`}>
      {React.Children.map(children, (child, idx) => {
        if (React.isValidElement(child)) {
          if ('isActive' in child.props) {
            return React.cloneElement(child, {
              ...child.props,
              isActive: isActive && idx === activeIndex,
              index: idx,
            });
          } else {
            return (
              <InoElementWrapper
                isActive={isActive && idx === activeIndex}
                index={idx}
              >
                {child}
              </InoElementWrapper>
            );
          }
        }
        return child;
      })}
    </div>
  );
};
