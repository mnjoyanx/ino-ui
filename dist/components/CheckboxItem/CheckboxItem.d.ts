import React from 'react';
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
export declare const CheckboxItem: React.FC<CheckboxItemProps>;
