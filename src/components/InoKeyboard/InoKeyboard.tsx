import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { InoKeyboardProps } from './InoKeyboard.types';
import { InoButton } from '../InoButton/Index';
import useKeydown from '../../hooks/useKeydown';
import { standardLayout, netflixLayout } from './layouts';
import '../../styles/InoKeyboard.css';

export const InoKeyboard: React.FC<InoKeyboardProps> = ({
  isOpen,
  onClose,
  onChange,
  initialValue = '',
  maxLength = 50,
  variant = 'standard',
  layout = 'qwerty',
  customLayouts = {},
  classNames = '',
  onSubmit,
}) => {
  const [, setText] = useState(initialValue);
  const [activeRow, setActiveRow] = useState(0);
  const [activeCol, setActiveCol] = useState(0);

  const getKeyboardLayout = () => {
    if (customLayouts[variant]) {
      return customLayouts[variant];
    }

    switch (variant) {
      case 'netflix':
        return netflixLayout;
      case 'standard':
      default:
        return standardLayout;
    }
  };

  const currentLayout = getKeyboardLayout();
  const keys = currentLayout[layout] || currentLayout['qwerty'];

  const handleKeyPress = useCallback(
    (key: string) => {
      setText(prev => {
        let newText = prev;

        switch (key) {
          case 'delete':
            newText = prev.slice(0, -1);
            break;
          case 'space':
            newText = prev + ' ';
            break;
          case 'submit':
            onSubmit?.(prev);
            break;
          default:
            if (prev.length < maxLength) {
              newText = prev + key;
            }
        }

        onChange(newText);
        return newText;
      });
    },
    [maxLength, onChange, onSubmit]
  );

  const handleNavigation = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      const currentRow = keys[activeRow];

      switch (direction) {
        case 'up':
          setActiveRow(prev => Math.max(0, prev - 1));
          break;
        case 'down':
          setActiveRow(prev => Math.min(keys.length - 1, prev + 1));
          break;
        case 'left':
          setActiveCol(prev => Math.max(0, prev - 1));
          break;
        case 'right':
          setActiveCol(prev => Math.min(currentRow.length - 1, prev + 1));
          break;
      }
    },
    [activeRow, keys]
  );

  useKeydown({
    isActive: isOpen,
    up: () => handleNavigation('up'),
    down: () => handleNavigation('down'),
    left: () => handleNavigation('left'),
    right: () => handleNavigation('right'),
    ok: () => {
      const key = keys[activeRow][activeCol];
      handleKeyPress(key.value);
    },
    back: onClose,
  });

  if (!isOpen) return null;

  return createPortal(
    <div className={`ino-keyboard-overlay ${classNames}`}>
      <div className={`ino-keyboard ino-keyboard--${variant}`}>
        <div className="ino-keyboard-keys">
          {keys.map((row, rowIndex: number) => (
            <div key={rowIndex} className="ino-keyboard-row">
              {row.map((key, colIndex: number) => (
                <InoButton
                  index={colIndex}
                  key={`${rowIndex}-${colIndex}`}
                  isActive={activeRow === rowIndex && activeCol === colIndex}
                  onClick={() => handleKeyPress(key.value)}
                  classNames={`ino-keyboard-key ${
                    key.action ? `ino-keyboard-key--${key.action}` : ''
                  }`}
                  style={{ width: key.width ? `${key.width}rem` : undefined }}
                >
                  {key.label}
                </InoButton>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};
