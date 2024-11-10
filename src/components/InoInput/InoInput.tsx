import React, { useCallback } from 'react';
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
  const handleFocus = useCallback(() => {
    if (!disabled) {
      onFocus?.();
    }
  }, [disabled, onFocus]);

  const handleBlur = useCallback(() => {
    onBlur?.();
  }, [onBlur]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!isFocused || disabled) return;

      let newValue = value;

      // Handle backspace
      if (e.key === 'Backspace') {
        newValue = value.slice(0, -1);
      }
      // Handle regular input
      else if (e.key.length === 1) {
        if (maxLength && value.length >= maxLength) return;

        if (type === 'number' && !/^\d$/.test(e.key)) return;

        newValue = value + e.key;
      }

      onChange?.(newValue);
    },
    [value, onChange, maxLength, type, isFocused, disabled]
  );

  useKeydown({
    isActive: isFocused,
    back: handleBlur,
    number: handleKeyPress,
    letter: handleKeyPress,
  });

  const displayValue = type === 'password' ? '•'.repeat(value.length) : value;

  return (
    <div
      className={`ino-input ino-input--${variant} ${
        isFocused ? 'ino-input--focused' : ''
      } ${disabled ? 'ino-input--disabled' : ''} ${classNames}`}
      onClick={handleFocus}
      role="textbox"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {displayValue}
      {showCursor && isFocused && <span className="ino-input__cursor">|</span>}
      {!displayValue && !isFocused && (
        <span className="ino-input__placeholder">{placeholder}</span>
      )}
    </div>
  );
};
