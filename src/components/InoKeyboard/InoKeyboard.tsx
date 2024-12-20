import React, { useState, useCallback, useEffect } from 'react';
import { InoKeyboardProps, KeyboardAction } from './InoKeyboard.types';
import { InoButton } from '../InoButton/Index';
import useKeydown from '../../hooks/useKeydown';
import { standardLayout, netflixLayout } from './layouts';
import '../../styles/InoKeyboard.css';

export const InoKeyboard: React.FC<InoKeyboardProps> = ({
  isOpen,
  onClose,
  onChange,
  variant = 'standard',
  layout = 'qwerty',
  customLayout,
  classNames = '',
  onSubmit,
  onActiveKeyChange,
  infinite = false,
}) => {
  const [activeRow, setActiveRow] = useState(0);
  const [activeCol, setActiveCol] = useState(0);
  const [isShifted, setIsShifted] = useState(false);
  const [shiftLocked, setShiftLocked] = useState(false);
  const [lastShiftPress, setLastShiftPress] = useState<number>(0);

  const getKeyboardLayout = () => {
    if (customLayout) {
      return customLayout;
    }

    const layoutMap = {
      netflix: netflixLayout,
      standard: standardLayout,
    };

    return (
      (layoutMap[variant] || standardLayout)[layout] || standardLayout.qwerty
    );
  };

  const keys = getKeyboardLayout();

  useEffect(() => {
    if (onActiveKeyChange && keys[activeRow]?.[activeCol]) {
      onActiveKeyChange(keys[activeRow][activeCol]);
    }
  }, [activeRow, activeCol, keys, onActiveKeyChange]);

  const handleKeyPress = useCallback(
    (key: string, action?: KeyboardAction) => {
      // Handle function actions
      if (typeof action === 'function') {
        action();
        return;
      }

      switch (action) {
        case 'delete':
          onChange('');
          break;
        case 'space':
          onChange(' ');
          break;
        case 'submit':
          onSubmit?.(key);
          break;
        case 'shift':
          const now = Date.now();
          if (now - lastShiftPress < 500) {
            setShiftLocked(true);
            setIsShifted(true);
          } else {
            if (shiftLocked) {
              setShiftLocked(false);
              setIsShifted(false);
            } else {
              setIsShifted(true);
            }
          }
          setLastShiftPress(now);
          break;
        case 'clear':
          onChange('');
          break;
        default:
          const charToAdd = isShifted ? key.toUpperCase() : key;
          onChange(charToAdd);
          if (isShifted && !shiftLocked) {
            setIsShifted(false);
          }
      }
    },
    [onChange, onSubmit, isShifted, shiftLocked, lastShiftPress]
  );

  const handleNavigation = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      const currentRow = keys[activeRow];
      const nextRow =
        direction === 'up'
          ? keys[activeRow - 1]
          : direction === 'down'
          ? keys[activeRow + 1]
          : null;

      switch (direction) {
        case 'up':
          setActiveRow(prev => {
            if (prev === 0 && infinite) {
              return keys.length - 1;
            }
            return Math.max(0, prev - 1);
          });
          // Adjust column if moving to a shorter row
          if (nextRow && activeCol >= nextRow.length) {
            setActiveCol(nextRow.length - 1);
          }
          break;
        case 'down':
          setActiveRow(prev => {
            if (prev === keys.length - 1 && infinite) {
              return 0;
            }
            return Math.min(keys.length - 1, prev + 1);
          });
          // Adjust column if moving to a shorter row
          if (nextRow && activeCol >= nextRow.length) {
            setActiveCol(nextRow.length - 1);
          }
          break;
        case 'left':
          setActiveCol(prev => {
            if (prev === 0 && infinite) {
              return currentRow.length - 1;
            }
            return Math.max(0, prev - 1);
          });
          break;
        case 'right':
          setActiveCol(prev => {
            if (prev === currentRow.length - 1 && infinite) {
              return 0;
            }
            return Math.min(currentRow.length - 1, prev + 1);
          });
          break;
      }
    },
    [activeRow, activeCol, keys, infinite]
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

  return (
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
                  onMouseEnter={(_, index) => {
                    setActiveRow(rowIndex);
                    setActiveCol(index);
                  }}
                  onClick={() => handleKeyPress(key.value, key.action)}
                  classNames={`ino-keyboard-key ${
                    key.action ? `ino-keyboard-key--${key.action}` : ''
                  } ${key.action === 'shift' && isShifted ? 'active' : ''}`}
                  style={{ width: key.width ? `${key.width}rem` : undefined }}
                >
                  {key.action === 'shift' && typeof key.label === 'string'
                    ? key.label
                    : isShifted && !key.action
                    ? key.label.toUpperCase()
                    : key.label}
                </InoButton>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
