import React, { useState, useEffect } from 'react';
import { InoColProps } from './InoLayout.types';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';
import { InoElementWrapper } from './InoElementWrapper';
import { InoRow } from './InoRow';
import '../../styles/InoLayout.css';

export const InoCol: React.FC<InoColProps> = props => {
  const parent = React.useContext(React.createContext<any>(null));

  if (!parent || parent.type !== InoRow) {
    console.warn('InoCol must be used as a child of InoRow');
    return null;
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const childrenArray = React.Children.toArray(props.children);

  useEffect(() => {
    if (props.isActive && props.onActiveChange) {
      props.onActiveChange(activeIndex);
    }
  }, [props.isActive, activeIndex, props.onActiveChange]);

  const handleNavigation = (direction: 'up' | 'down') => {
    if (!props.isActive) return;

    setActiveIndex(prev => {
      if (direction === 'up') {
        if (prev === 0 && props.infinite) {
          return childrenArray.length - 1;
        }
        return Math.max(0, prev - 1);
      } else {
        if (prev === childrenArray.length - 1 && props.infinite) {
          return 0;
        }
        return Math.min(childrenArray.length - 1, prev + 1);
      }
    });
  };

  useMappedKeydown({
    isActive: props.isActive,
    onUp: e => {
      if (activeIndex === 0 && !props.infinite && props.onUp) {
        props.onUp(e, activeIndex);
      } else {
        handleNavigation('up');
      }
    },
    onDown: e => {
      if (
        activeIndex === childrenArray.length - 1 &&
        !props.infinite &&
        props.onDown
      ) {
        props.onDown(e, activeIndex);
      } else {
        handleNavigation('down');
      }
    },
    onLeft: props.onLeft,
    onRight: props.onRight,
    onOk: props.onOk,
  });

  return (
    <div className={`ino-col ${props.classNames}`}>
      {React.Children.map(props.children, (child, idx) => {
        if (React.isValidElement(child)) {
          if ('isActive' in child.props) {
            return React.cloneElement(child, {
              ...child.props,
              isActive: props.isActive && idx === activeIndex,
              index: idx,
            });
          } else {
            return (
              <InoElementWrapper
                isActive={props.isActive && idx === activeIndex}
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
