import React, { useCallback, useState, useRef, useEffect } from 'react';
import { InoInputProps } from './InoInput.types';
import useKeydown from '../../hooks/useKeydown';
import '../../styles/InoInput.css';

export const InoInput: React.FC<InoInputProps> = ({
  value = '',
  placeholder = '',
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  showCursor = true,
  classNames = '',
  maxLength,
  isFocused = false,
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

  const handleBlur = useCallback(() => {
    onBlur?.();
  }, [onBlur]);

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
      if (!isFocused || disabled) return;

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
    [value, onChange, maxLength, type, isFocused, disabled, cursorPosition]
  );

  const handleNavigation = useCallback(
    (direction: 'left' | 'right') => {
      if (!isFocused) return;
      updateCursorPosition(direction);
    },
    [isFocused, updateCursorPosition]
  );

  useKeydown({
    isActive: isFocused,
    back: handleBlur,
    number: handleKeyPress,
    letter: handleKeyPress,
    left: () => handleNavigation('left'),
    right: () => handleNavigation('right'),
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
        isFocused ? 'ino-input--focused' : ''
      } ${disabled ? 'ino-input--disabled' : ''} ${classNames}`}
      onClick={handleFocus}
      role="textbox"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <div ref={contentRef} className="ino-input__content">
        {displayValue.slice(0, cursorPosition)}
        {showCursor && isFocused && (
          <span className="ino-input__cursor">|</span>
        )}
        {displayValue.slice(cursorPosition)}
      </div>
      {!displayValue && !isFocused && (
        <span className="ino-input__placeholder">{placeholder}</span>
      )}
    </div>
  );
};
