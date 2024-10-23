import React, { useState, useCallback } from 'react';
import useKeydown from '../../hooks/useKeydown';

interface DefaultCheckboxProps {
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

interface CheckboxItemProps {
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
