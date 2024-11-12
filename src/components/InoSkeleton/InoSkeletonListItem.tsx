import React from 'react';
import { InoSkeleton } from './InoSkeleton';

interface InoSkeletonListItemProps {
  avatarSize?: number;
  lines?: number;
  className?: string;
}

export const InoSkeletonListItem: React.FC<InoSkeletonListItemProps> = ({
  avatarSize = 5,
  lines = 3,
  className = '',
}) => {
  return (
    <div className={`ino-skeleton-wrapper ${className}`}>
      <InoSkeleton variant="circular" width={avatarSize} height={avatarSize} />
      <div className="ino-skeleton--text-container">
        {Array(lines)
          .fill(0)
          .map((_, index) => (
            <InoSkeleton
              key={index}
              variant="text"
              height={1.6}
              animation="wave"
            />
          ))}
      </div>
    </div>
  );
};
