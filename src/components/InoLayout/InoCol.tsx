import React, { useState, useEffect } from 'react';
import { InoColProps } from './InoLayout.types';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';
import { InoElementWrapper } from './InoElementWrapper';
import '../../styles/InoLayout.css';

export const InoCol: React.FC<InoColProps> = ({
  children,
  isActive = false,
  infinite = false,
  classNames = '',
  onActiveChange,
  onLeft,
  onRight,
  onUp,
  onDown,
  onOk,
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
    onUp: e => {
      if (activeIndex === 0 && !infinite && onUp) {
        onUp(e, activeIndex);
      } else {
        handleNavigation('up');
      }
    },
    onDown: e => {
      if (activeIndex === childrenArray.length - 1 && !infinite && onDown) {
        onDown(e, activeIndex);
      } else {
        handleNavigation('down');
      }
    },
    onLeft,
    onRight,
    onOk,
  });

  return (
    <div className={`ino-col ${classNames}`}>
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
