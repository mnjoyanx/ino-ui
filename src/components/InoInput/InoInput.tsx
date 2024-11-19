import React, { useCallback, useState, useRef, useEffect } from 'react';
import { InoInputProps } from './InoInput.types';
import '../../styles/InoInput.css';
import { useMappedKeydown } from '../../hooks/useMappedKeydown';
import { MouseKeyboardEvent } from '../../types';

export const InoInput: React.FC<InoInputProps> = ({
  value = '',
  placeholder = '',
  disabled = false,
  showCursor = true,
  classNames = '',
  maxLength,
  isActive = false,
  index,
  type = 'text',
  variant = 'standard',
  onChange,
  onFocus,
  onBlur,
  onBack,
  onOk,
  onLeft,
  onRight,
  onUp,
  onDown,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [cursorPosition, setCursorPosition] = useState(value.length);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFocus = useCallback(
    (e: React.FocusEvent | MouseKeyboardEvent) => {
      if (!disabled) {
        onFocus?.(e, index);
      }
    },
    [disabled, onFocus]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;

      const rect = contentRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const text = value;
      let newPosition = text.length;

      // Calculate approximate character position based on click position
      const charWidth = 8; // Approximate character width in pixels
      const clickedPosition = Math.floor(x / charWidth);
      newPosition = Math.min(Math.max(0, clickedPosition), text.length);

      setCursorPosition(newPosition);
      handleFocus(e as MouseKeyboardEvent);
    },
    [value, disabled, handleFocus]
  );

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
        if (type === 'password' && !/^\d$/.test(e.key)) return;

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
    onLeft: (e: KeyboardEvent, index?: number) => {
      if (showCursor) {
        handleNavigation('left');
      } else {
        onLeft?.(e, index);
      }
    },
    onRight: (e: KeyboardEvent, index?: number) => {
      if (showCursor) {
        handleNavigation('right');
      } else {
        onRight?.(e, index);
      }
    },
    onRemove: handleKeyPress,
    onOk,
    onBack: (e: KeyboardEvent, index?: number) => {
      onBack?.(e, index);
      onBlur?.(e, index);
    },
    onUp,
    onDown,
  });

  useEffect(() => {
    if (contentRef.current && containerRef.current) {
      const container = containerRef.current;
      const content = contentRef.current;
      container.scrollLeft = content.scrollWidth;
    }
  }, [value]);

  useEffect(() => {
    setCursorPosition(value.length);
  }, [value]);

  const displayValue = type === 'password' ? '•'.repeat(value.length) : value;

  return (
    <div
      ref={containerRef}
      onMouseEnter={(e: React.MouseEvent) => {
        onMouseEnter?.(e as React.MouseEvent);
      }}
      onMouseLeave={(e: React.MouseEvent) => {
        onMouseLeave?.(e as React.MouseEvent);
      }}
      className={`ino-input ino-input--${variant} ${isActive ? 'active' : ''} ${
        disabled ? 'ino-input--disabled' : ''
      } ${classNames}`}
      onClick={handleClick}
      role="textbox"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <div ref={contentRef} className="ino-input__content">
        {displayValue.slice(0, cursorPosition)}
        {showCursor && isActive && <span className="ino-input__cursor">|</span>}
        {displayValue.slice(cursorPosition)}
      </div>
      {!displayValue && placeholder && !isActive && (
        <span className="ino-input__placeholder">{placeholder}</span>
      )}
    </div>
  );
};
