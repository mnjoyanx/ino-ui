import React, { useState } from 'react';
import { InoSidebarProps } from './InoSidebar.types';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';
import '../../styles/InoSidebar.css';

export const InoSidebar: React.FC<InoSidebarProps> = ({
  items = [],
  selectedId,
  collapsed = false,
  isActive = false,
  classNames = '',
  position = 'left',
  onSelect,
  onUp,
  onDown,
  onRight,
  onLeft,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const classes = [
    'ino-sidebar',
    `ino-sidebar--${position}`,
    collapsed && 'collapsed',
    classNames,
  ]
    .filter(Boolean)
    .join(' ');

  useMappedKeydown({
    isActive,
    onUp: e => {
      if (activeIndex === 0) {
        onUp?.(e, activeIndex);
      } else {
        setActiveIndex(prev => Math.max(0, prev - 1));
      }
    },
    onDown: e => {
      if (activeIndex === items.length - 1) {
        onDown?.(e, activeIndex);
      } else {
        setActiveIndex(prev => Math.min(items.length - 1, prev + 1));
      }
    },
    onLeft,
    onRight,
    onOk: () => {
      const selectedItem = items[activeIndex];
      if (selectedItem && !selectedItem.disabled) {
        onSelect?.(selectedItem);
      }
    },
  });

  return (
    <aside className={classes}>
      {items.map((item, index) => (
        <div
          key={item.id}
          onMouseEnter={() => setActiveIndex(index)}
          className={[
            'ino-sidebar-item',
            selectedId === item.id && 'selected',
            isActive && activeIndex === index && 'active',
            item.disabled && 'disabled',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => !item.disabled && onSelect?.(item)}
        >
          <div className="ino-sidebar-item__icon">{item.icon}</div>
          {!collapsed && (
            <div className="ino-sidebar-item__content">
              <span className="ino-sidebar-item__label">{item.label}</span>
            </div>
          )}
        </div>
      ))}
    </aside>
  );
};
