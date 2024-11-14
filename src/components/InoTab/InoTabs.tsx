import React, { useState, useEffect } from 'react';
import { InoTabsProps, InoTabProps } from './InoTab.types';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';
import '../../styles/InoTab.css';

export const InoTabs: React.FC<InoTabsProps> = ({
  children,
  selectedIndex = 0,
  activeIndex: controlledActiveIndex,
  changeByOnOk = false,
  direction = 'horizontal',
  variant = 'primary',
  size = 'medium',
  infinite = false,
  classNames = '',
  onChange,
  onActiveChange,
}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(selectedIndex);
  const [activeTabIndex, setActiveTabIndex] = useState(
    controlledActiveIndex ?? selectedIndex
  );
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    setSelectedTabIndex(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    if (controlledActiveIndex !== undefined) {
      setActiveTabIndex(controlledActiveIndex);
    }
  }, [controlledActiveIndex]);

  const handleTabChange = (index: number) => {
    if (!changeByOnOk) {
      setSelectedTabIndex(index);
      onChange?.(index);
    }
    setActiveTabIndex(index);
    onActiveChange?.(index);
  };

  const handleNavigation = (direction: 'up' | 'down' | 'left' | 'right') => {
    const isBackward = direction === 'up' || direction === 'left';

    const newIndex = isBackward
      ? activeTabIndex === 0 && infinite
        ? childrenArray.length - 1
        : Math.max(0, activeTabIndex - 1)
      : activeTabIndex === childrenArray.length - 1 && infinite
      ? 0
      : Math.min(childrenArray.length - 1, activeTabIndex + 1);

    setActiveTabIndex(newIndex);
    onActiveChange?.(newIndex);
  };

  useMappedKeydown({
    isActive: true,
    onLeft: () => direction === 'horizontal' && handleNavigation('left'),
    onRight: () => direction === 'horizontal' && handleNavigation('right'),
    onUp: () => direction === 'vertical' && handleNavigation('up'),
    onDown: () => direction === 'vertical' && handleNavigation('down'),
    onOk: () => {
      if (changeByOnOk) {
        setSelectedTabIndex(activeTabIndex);
        onChange?.(activeTabIndex);
      }
    },
  });

  return (
    <div className="ino-tabs-container">
      <div
        role="tablist"
        className={`ino-tabs ino-tabs--${direction} ino-tabs--${variant} ino-tabs--${size} ${classNames}`}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<InoTabProps>(child)) {
            return React.cloneElement(child, {
              ...child.props,
              isActive: index === activeTabIndex,
              isSelected: index === selectedTabIndex,
              onClick: () => handleTabChange(index),
              variant,
              size,
              index,
            });
          }
          return child;
        })}
      </div>
      <div className="ino-tab-panels">
        {React.Children.map(children, (child, index) => {
          if (
            React.isValidElement<InoTabProps>(child) &&
            index === selectedTabIndex
          ) {
            return (
              <div role="tabpanel" className="ino-tab-panel">
                {child.props.children}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
