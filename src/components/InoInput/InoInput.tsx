import React, { useCallback } from 'react';
import { InoInputProps } from './InoInput.types';
import useKeydown from '../../hooks/useKeydown';

export const InoInput: React.FC<InoInputProps> = ({
  value = '',
  placeholder = '',
  onFocus,
  onBlur,
  disabled = false,
  showCursor = true,
  classNames = '',
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

  useKeydown({
    isActive: isFocused,
    back: handleBlur,
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
