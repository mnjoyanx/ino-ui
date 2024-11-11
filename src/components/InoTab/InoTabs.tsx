import React, { useState, useEffect } from 'react';
import { InoTabsProps, InoTabProps } from './InoTab.types';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';
import '../../styles/InoTab.css';

export const InoTabs: React.FC<InoTabsProps> = ({
  children,
  selectedIndex = 0,
  activeIndex: controlledActiveIndex,
  changeByOnOk = false,
  onChange,
  onActiveChange,
  variant = 'primary',
  size = 'medium',
  infinite = false,
  classNames = '',
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

  const handleNavigation = (direction: 'left' | 'right') => {
    const newIndex =
      direction === 'left'
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
    onLeft: () => handleNavigation('left'),
    onRight: () => handleNavigation('right'),
    onOk: () => {
      if (changeByOnOk) {
        setSelectedTabIndex(activeTabIndex);
        onChange?.(activeTabIndex);
      }
    },
  });

  return (
    <div
      role="tablist"
      className={`ino-tabs ino-tabs--${variant} ino-tabs--${size} ${classNames}`}
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
  );
};
