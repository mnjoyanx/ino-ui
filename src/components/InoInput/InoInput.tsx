import React, { useCallback, useState, useRef, useEffect } from 'react';
import { InoInputProps } from './InoInput.types';
import '../../styles/InoInput.css';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';

export const InoInput: React.FC<InoInputProps> = ({
  value = '',
  placeholder = '',
  onChange,
  onFocus,
  disabled = false,
  showCursor = true,
  classNames = '',
  maxLength,
  isActive = false,
  type = 'text',
  variant = 'standard',
}) => {
  const [cursorPosition, setCursorPosition] = useState(value.length);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFocus = useCallback(() => {
    if (!disabled) {
      onFocus?.();
    }
  }, [disabled, onFocus]);

  const updateCursorPosition = useCallback(
    (direction: 'left' | 'right') => {
      setCursorPosition(prev => {
        if (direction === 'left') {
          return Math.max(0, prev - 1);
        } else {
          return Math.min(value.length, prev + 1);
        }
      });
    },
    [value.length]
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      console.log('handleKeyPress', e);
      if (!isActive || disabled) return;

      let newValue = value;
      let newPosition = cursorPosition;

      if (e.key === 'Backspace') {
        if (cursorPosition > 0) {
          newValue =
            value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
          newPosition = cursorPosition - 1;
        }
      } else if (e.key.length === 1) {
        if (maxLength && value.length >= maxLength) return;
        if (type === 'number' && !/^\d$/.test(e.key)) return;

        newValue =
          value.slice(0, cursorPosition) + e.key + value.slice(cursorPosition);
        newPosition = cursorPosition + 1;
      }

      onChange?.(newValue);
      setCursorPosition(newPosition);
    },
    [value, onChange, maxLength, type, isActive, disabled, cursorPosition]
  );

  const handleNavigation = useCallback(
    (direction: 'left' | 'right') => {
      if (!isActive) return;
      updateCursorPosition(direction);
    },
    [isActive, updateCursorPosition]
  );

  useMappedKeydown({
    isActive: isActive,
    onNumber: handleKeyPress,
    onLetter: handleKeyPress,
    onLeft: () => handleNavigation('left'),
    onRight: () => handleNavigation('right'),
  });

  useEffect(() => {
    if (contentRef.current && containerRef.current) {
      const container = containerRef.current;
      const content = contentRef.current;
      container.scrollLeft = content.scrollWidth;
    }
  }, [value]);

  const displayValue = type === 'password' ? '•'.repeat(value.length) : value;

  return (
    <div
      ref={containerRef}
      className={`ino-input ino-input--${variant} ${
        isActive ? 'ino-input--focused' : ''
      } ${disabled ? 'ino-input--disabled' : ''} ${classNames}`}
      onClick={handleFocus}
      role="textbox"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <div ref={contentRef} className="ino-input__content">
        {displayValue.slice(0, cursorPosition)}
        {showCursor && isActive && <span className="ino-input__cursor">|</span>}
        {displayValue.slice(cursorPosition)}
      </div>
      {!displayValue && (
        <span className="ino-input__placeholder">{placeholder}</span>
      )}
    </div>
  );
};
