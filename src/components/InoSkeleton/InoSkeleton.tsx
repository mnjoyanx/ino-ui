import React from 'react';
import { InoSkeletonProps } from './InoSkeleton.types';
import '../../styles/InoSkeleton.css';

export const InoSkeleton: React.FC<InoSkeletonProps> = ({
  width = '100%',
  height,
  variant = 'rectangular',
  textVariant = 'body',
  animation = 'pulse',
  className = '',
  style = {},
  borderRadius = 0.4,
}) => {
  const getWidth = () => {
    if (typeof width === 'number') return `${width}rem`;
    return width;
  };

  const getHeight = () => {
    if (typeof height === 'number') return `${height}rem`;
    return height;
  };

  const classes = [
    'ino-skeleton',
    `ino-skeleton--${variant}`,
    `ino-skeleton--animation-${animation}`,
    variant === 'text' && `ino-skeleton--${textVariant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      style={{
        width: getWidth(),
        height: variant === 'text' ? undefined : getHeight(),
        borderRadius: variant === 'circular' ? '50%' : `${borderRadius}rem`,
        ...style,
      }}
      aria-label="Loading..."
      role="progressbar"
    />
  );
};

export default InoSkeleton;
