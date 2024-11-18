import React, { useState, useRef } from 'react';
import { InoKeyboard } from '../InoKeyboard/InoKeyboard';
import useKeydown from '../../hooks/useKeydown';

interface InoProtectInputProps {
  onChange?: (value: string) => void;
  count?: number;
  withLetters?: boolean;
  keyboard?: boolean;
  onComplete?: (value: string) => void;
  isActive?: boolean;
  onBack?: () => void;
}

export const InoProtectInput: React.FC<InoProtectInputProps> = ({
  onChange,
  count = 4,
  withLetters = false,
  keyboard = true,
  onComplete,
  isActive = false,
  onBack,
}) => {
  const [values, setValues] = useState<string[]>(Array(count).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    if (!isValidInput(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < count - 1) {
      setActiveIndex(index + 1);
    }

    onChange?.(newValues.join(''));

    if (newValues.every(v => v) && onComplete) {
      onComplete(newValues.join(''));
    }
  };

  const handleRemove = () => {
    const newValues = [...values];
    if (values[activeIndex]) {
      // If current position has a value, clear it
      newValues[activeIndex] = '';
    } else if (activeIndex > 0) {
      // If current position is empty and we're not at the first position,
      // clear previous position and move back
      setActiveIndex(activeIndex - 1);
      newValues[activeIndex - 1] = '';
    }

    setValues(newValues);
    onChange?.(newValues.join(''));
  };

  const handleKeyboardChange = (text: string) => {
    if (text === '') {
      // Handle backspace/remove from keyboard
      handleRemove();
    } else {
      handleInputChange(activeIndex, text);
    }
  };

  const isValidInput = (value: string): boolean => {
    if (!value) return true;
    if (withLetters) {
      return /^[A-Za-z0-9]$/.test(value);
    }
    return /^[0-9]$/.test(value);
  };

  const handleInputFocus = (index: number) => {
    setActiveIndex(index);
  };

  useKeydown({
    isActive,
    left: () => {
      if (!isKeyboardOpen) {
        setActiveIndex(prev => Math.max(0, prev - 1));
      }
    },
    right: () => {
      if (!isKeyboardOpen) {
        setActiveIndex(prev => Math.min(count - 1, prev + 1));
      }
    },
    ok: () => {
      if (!isKeyboardOpen && keyboard) {
        setIsKeyboardOpen(true);
      }
    },
    back: () => {
      if (isKeyboardOpen) {
        setIsKeyboardOpen(false);
      } else if (onBack) {
        onBack();
      }
    },
  });

  return (
    <div className="ino-protect-input-container">
      <div className="ino-protect-input-boxes">
        {Array(count)
          .fill(null)
          .map((_, index) => (
            <input
              key={index}
              ref={el => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={values[index]}
              onChange={e => handleInputChange(index, e.target.value)}
              onFocus={() => handleInputFocus(index)}
              className={`ino-protect-input-box ${
                values[index] ? 'filled' : ''
              } ${index === activeIndex && isActive ? 'active' : ''}`}
              readOnly={keyboard}
            />
          ))}
      </div>
      {keyboard && (
        <InoKeyboard
          isOpen={isKeyboardOpen}
          onClose={() => setIsKeyboardOpen(false)}
          onChange={handleKeyboardChange}
          variant="standard"
          layout={withLetters ? 'qwerty' : 'numeric'}
        />
      )}
    </div>
  );
};
