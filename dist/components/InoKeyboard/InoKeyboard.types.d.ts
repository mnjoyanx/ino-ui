export declare type KeyboardVariant = 'netflix' | 'standard';
export declare type KeyboardLayout = 'qwerty' | 'numeric';
export interface KeyboardKey {
    label: string;
    value: string;
    width?: number;
    action?: 'input' | 'delete' | 'space' | 'clear' | 'submit';
}
export interface InoKeyboardProps {
    /** Determines if the keyboard is visible */
    isOpen: boolean;
    /** Function called when keyboard should close */
    onClose: () => void;
    /** Callback function when text changes */
    onChange: (text: string) => void;
    /** Initial text value */
    value?: string;
    /** Maximum length of input */
    maxLength?: number;
    /** Keyboard visual variant */
    variant?: KeyboardVariant;
    /** Keyboard layout type */
    layout?: KeyboardLayout;
    /** Custom class names */
    classNames?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Submit button text */
    submitText?: string;
    /** Function called on submit */
    onSubmit?: (text: string) => void;
    /** Direction of the keyboard */
    direction?: 'ltr' | 'rtl';
}
