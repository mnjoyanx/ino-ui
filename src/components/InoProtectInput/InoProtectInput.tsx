import { useState, useRef, type FC } from 'react';
import { InoKeyboard } from '../InoKeyboard/InoKeyboard';
import { KeyboardKey } from '../InoKeyboard/InoKeyboard.types';

interface InoProtectInputProps {
  onChange?: (value: string) => void;
  count?: number;
  withLetters?: boolean;
  keyboard?: boolean;
  onComplete?: (value: string) => void;
}

export const InoProtectInput: FC<InoProtectInputProps> = ({
  onChange,
  count = 4,
  withLetters = false,
  keyboard = true,
  onComplete,
}: InoProtectInputProps) => {
  const [values, setValues] = useState<string[]>(Array(count).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const createNumericLayout = (): KeyboardKey[][] => [
    [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
    ],
    [
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' },
    ],
    [
      { label: '7', value: '7' },
      { label: '8', value: '8' },
      { label: '9', value: '9' },
    ],
    [
      { label: 'Clear', value: 'clear', action: 'clear' },
      { label: '0', value: '0' },
      { label: '⌫', value: 'delete', action: 'delete' },
    ],
  ];

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

  const isValidInput = (value: string): boolean => {
    if (!value) return true;
    if (withLetters) {
      return /^[A-Za-z0-9]$/.test(value);
    }
    return /^[0-9]$/.test(value);
  };

  const handleKeyboardChange = (text: string) => {
    handleInputChange(activeIndex, text);
  };

  const handleInputFocus = (index: number) => {
    setActiveIndex(index);
    if (keyboard) {
      setIsKeyboardOpen(true);
    }
  };

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
              } ${index === activeIndex ? 'active' : ''}`}
              readOnly={keyboard}
            />
          ))}
      </div>
      {keyboard && (
        <InoKeyboard
          isOpen={isKeyboardOpen}
          onClose={() => setIsKeyboardOpen(false)}
          onChange={handleKeyboardChange}
          customLayout={!withLetters ? createNumericLayout() : undefined}
          variant="standard"
          layout={withLetters ? 'qwerty' : 'numeric'}
        />
      )}
    </div>
  );
};
