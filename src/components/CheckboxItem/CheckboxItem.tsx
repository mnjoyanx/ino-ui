import React, { useState, useCallback } from 'react';
import useKeydown from '../../hooks/useKeydown';

/**
 * Interface for DefaultCheckbox component props.
 *
 * @property {boolean} isChecked - Indicates if the checkbox is checked.
 * @property {boolean} isActive - Indicates if the checkbox is active.
 */
export interface DefaultCheckboxProps {
  isChecked: boolean;
  isActive: boolean;
}

const DefaultCheckbox: React.FC<DefaultCheckboxProps> = ({
  isChecked,
  isActive,
}) => (
  <svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="2"
      width="2rem"
      height="2rem"
      rx="4"
      stroke={isChecked ? '#2196f3' : isActive ? '#1976d2' : '#ccc'}
      strokeWidth="0.2rem"
      fill={isChecked ? '#2196f3' : 'white'}
    />
    {isChecked && (
      <path
        d="M7 13L10 16L17 9"
        stroke="white"
        strokeWidth="0.2rem"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

/**
 * Interface for CheckboxItem component props.
 *
 * @property {boolean} [defaultChecked] - Indicates if the checkbox is checked by default.
 * @property {string} label - The text label for the checkbox.
 * @property {(isChecked: boolean) => void} onChange - Callback function for when the checkbox state changes.
 * @property {boolean} isActive - Indicates if the checkbox is currently active.
 * @property {string} [classNames] - Additional CSS classes to apply to the checkbox item.
 * @property {React.FC<DefaultCheckboxProps>} [icon] - Custom icon component for the checkbox.
 * @property {() => void} [onDown] - Callback function for when the down navigation is triggered.
 * @property {() => void} [onUp] - Callback function for when the up navigation is triggered.
 * @property {() => void} [onLeft] - Callback function for when the left navigation is triggered.
 * @property {() => void} [onRight] - Callback function for when the right navigation is triggered.
 * @property {() => void} [onOk] - Callback function for when the OK button is pressed.
 * @property {() => void} [onBack] - Callback function for when the back button is pressed.
 * @property {boolean} [isRTL] - Indicates if the checkbox item is in a right-to-left layout.
 */

export interface CheckboxItemProps {
  defaultChecked?: boolean;
  label: string;
  onChange: (isChecked: boolean) => void;
  isActive: boolean;
  classNames?: string;
  icon?: React.FC<DefaultCheckboxProps>;
  onDown?: () => void;
  onUp?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  onOk?: () => void;
  onBack?: () => void;
  isRTL?: boolean;
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({
  defaultChecked = false,
  label,
  onChange,
  isActive,
  classNames = '',
  icon: CustomIcon,
  onDown,
  onUp,
  onLeft,
  onRight,
  onOk,
  onBack,
  isRTL = false,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = useCallback(() => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState);
  }, [isChecked, onChange]);

  const keyDownOptions = {
    isActive,
    ok: () => {
      handleToggle();
      onOk && onOk();
    },
    back: onBack,
    up: onUp,
    down: onDown,
    left: onLeft,
    right: onRight,
  };

  useKeydown(keyDownOptions);

  return (
    <div
      className={`ino-checkbox-item ${isActive ? 'active' : ''} ${
        isRTL ? 'rtl' : ''
      } ${classNames}`}
    >
      <label className="ino-checkbox-container">
        <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        <span className="ino-checkmark">
          {CustomIcon ? (
            <CustomIcon isChecked={isChecked} isActive={isActive} />
          ) : (
            <DefaultCheckbox isChecked={isChecked} isActive={isActive} />
          )}
        </span>
        <span className="ino-label">{label}</span>
      </label>
    </div>
  );
};
