import React, { useRef, useState } from 'react';
import { InoPlayerProgressProps } from './InoPlayerProgress.types';
import '../../styles/InoPlayerProgress.css';

export const InoPlayerProgress: React.FC<InoPlayerProgressProps> = ({
  value = 0,
  buffered = 0,
  isActive = false,
  onChange,
  onDragStart,
  onDragEnd,
  classNames = '',
  showTooltip = true,
  duration = 0,
  //   currentTime = 0,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  const [tooltipTime, setTooltipTime] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const clampedPosition = Math.max(0, Math.min(1, position));

    setTooltipPosition(clampedPosition * 100);
    setTooltipTime(duration * clampedPosition);

    if (isDragging) {
      onChange?.(clampedPosition * 100);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    onDragStart?.();
    handleMouseMove(e);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd?.();
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={progressRef}
      className={`
                ino-player-progress 
                ${isActive ? 'ino-player-progress--active' : ''}
                ${isDragging ? 'ino-player-progress--dragging' : ''}
                ${classNames}
            `}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseLeave={() => !isDragging && setTooltipPosition(-1)}
    >
      <div
        className="ino-player-progress__buffered"
        style={{ width: `${buffered}%` }}
      />
      <div
        className="ino-player-progress__value"
        style={{ width: `${value}%` }}
      />
      {showTooltip && tooltipPosition >= 0 && (
        <div
          className="ino-player-progress__tooltip"
          style={{ left: `${tooltipPosition}%` }}
        >
          {formatTime(tooltipTime)}
        </div>
      )}
      <div
        className="ino-player-progress__handle"
        style={{ left: `${value}%` }}
      />
    </div>
  );
};
