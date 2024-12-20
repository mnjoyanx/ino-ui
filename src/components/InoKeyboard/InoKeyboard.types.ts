export type KeyboardVariant = 'netflix' | 'standard' | string;
export type KeyboardLayout = 'qwerty' | 'numeric' | string;

export type KeyboardAction =
    | 'input'
    | 'delete'
    | 'space'
    | 'clear'
    | 'submit'
    | 'shift'
    | (() => void);

export interface KeyboardKey {
    label: string | React.ReactNode;
    value: string;
    width?: number;
    action?: KeyboardAction;
}

export interface KeyboardLayouts {
    [key: string]: KeyboardKey[][];
}

export interface InoKeyboardProps {
    /** Determines if the keyboard is visible */
    isOpen: boolean;
    /** Function called when keyboard should close */
    onClose: () => void;
    /** Callback function when text changes */
    onChange: (text: string) => void;
    /** Initial text value */
    initialValue?: string;
    /** Maximum length of input */
    maxLength?: number;
    /** Keyboard visual variant */
    variant?: KeyboardVariant;
    /** Keyboard layout type */
    layout?: KeyboardLayout;
    /** Custom keyboard layout */
    customLayout?: KeyboardKey[][];
    /** Custom class names */
    classNames?: string;
    /** Submit button text */
    submitText?: string;
    /** Function called on submit */
    onSubmit?: (text: string) => void;
    /** Direction of the keyboard */
    direction?: 'ltr' | 'rtl';
    /** Callback when active key changes */
    onActiveKeyChange?: (key: KeyboardKey) => void;
    /** Enable infinite scrolling */
    infinite?: boolean;
} 