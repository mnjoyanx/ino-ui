import React from 'react';
import { InoElementWrapperProps } from './InoLayout.types';

export const InoElementWrapper: React.FC<InoElementWrapperProps> = ({
  children,
  isActive = false,
  classNames = '',
}) => {
  return (
    <div
      className={`ino-element-wrapper ${
        isActive ? 'active' : ''
      } ${classNames}`}
    >
      {children}
    </div>
  );
};
