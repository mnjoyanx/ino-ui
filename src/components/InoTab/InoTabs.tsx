import React, { useState, useEffect } from 'react';
import { InoTabsProps, InoTabProps } from './InoTab.types';
import '../../styles/InoTab.css';

export const InoTabs: React.FC<InoTabsProps> = ({
  children,
  activeIndex = 0,
  onChange,
  variant = 'primary',
  size = 'medium',
  classNames = '',
}) => {
  const [selectedIndex, setSelectedIndex] = useState(activeIndex);

  useEffect(() => {
    setSelectedIndex(activeIndex);
  }, [activeIndex]);

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
    onChange?.(index);
  };

  return (
    <div
      role="tablist"
      className={`ino-tabs ino-tabs--${variant} ino-tabs--${size} ${classNames}`}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<InoTabProps>(child)) {
          return React.cloneElement(child, {
            isActive: index === selectedIndex,
            onClick: () => handleTabChange(index),
            index,
            variant,
            size,
          });
        }
        return child;
      })}
    </div>
  );
};
