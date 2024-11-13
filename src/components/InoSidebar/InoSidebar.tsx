import React, { useState } from 'react';
import { InoSidebarProps } from './InoSidebar.types';
import { InoSkeletonListItem } from '../InoSkeleton/InoSkeletonListItem';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';
import '../../styles/InoSidebar.css';

export const InoSidebar: React.FC<InoSidebarProps> = ({
  items = [],
  selectedId,
  loading = false,
  skeletonCount = 5,
  collapsed = false,
  isActive = false,
  className = '',
  position = 'left',
  rtl = false,
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
    rtl && 'ino-sidebar--rtl',
    className,
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

  if (loading) {
    return (
      <aside className={classes}>
        {Array(skeletonCount)
          .fill(0)
          .map((_, index) => (
            <InoSkeletonListItem
              key={index}
              avatarSize={3.2}
              lines={collapsed ? 0 : 1}
            />
          ))}
      </aside>
    );
  }

  return (
    <aside className={classes}>
      {items.map((item, index) => (
        <div
          key={item.id}
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
          {item.icon && (
            <div className="ino-sidebar-item__icon">{item.icon}</div>
          )}
          {!collapsed && (
            <span className="ino-sidebar-item__label">{item.label}</span>
          )}
        </div>
      ))}
    </aside>
  );
};
