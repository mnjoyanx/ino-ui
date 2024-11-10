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
  <svg width="2.4rem" height="2.4rem" viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="6"
      stroke={
        isChecked
          ? 'var(--ino-bg-primary)'
          : isActive
          ? 'var(--ino-bg-primary)'
          : 'var(--ino-border-secondary)'
      }
      strokeWidth="2"
      fill={isChecked ? 'var(--ino-bg-primary)' : 'white'}
    />
    {isChecked && (
      <path
        d="M7 12L10.5 15.5L17 9"
        stroke="white"
        strokeWidth="2.5"
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
 * @property {boolean} [checked] - Indicates if the checkbox is checked.
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

/**
 * Example usage of CheckboxItem component:
 *
 * ```jsx
 * // Controlled checkbox
 * const [isChecked, setIsChecked] = useState(false);
 *
 * <CheckboxItem
 *   checked={isChecked}
 *   label="Accept terms and conditions"
 *   onChange={(checked) => setIsChecked(checked)}
 *   isActive={true}
 * />
 *
 * // Uncontrolled checkbox with default state
 * <CheckboxItem
 *   defaultChecked={true}
 *   label="Remember me"
 *   onChange={(checked) => console.log('Checkbox changed:', checked)}
 *   isActive={false}
 * />
 * ```
 */

export interface CheckboxItemProps {
  defaultChecked?: boolean;
  checked?: boolean;
  label: string;
  onChange?: (isChecked: boolean) => void;
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
  checked,
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
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  // Use checked prop if provided, otherwise use internal state
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleToggle = useCallback(() => {
    const newCheckedState = !isChecked;
    // Only update internal state if not controlled
    if (checked === undefined) {
      setInternalChecked(newCheckedState);
    }
    // Only call onChange if it exists
    onChange?.(newCheckedState);
  }, [isChecked, onChange, checked]);

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
