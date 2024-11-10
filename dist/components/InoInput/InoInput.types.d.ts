export interface InoInputProps {
    /** Value of the input */
    value?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Called when value changes */
    onChange?: (value: string) => void;
    /** Called when input is focused */
    onFocus?: () => void;
    /** Called when input loses focus */
    onBlur?: () => void;
    /** Whether the input is disabled */
    disabled?: boolean;
    /** Whether to show the cursor animation */
    showCursor?: boolean;
    /** Custom class names */
    classNames?: string;
    /** Maximum length of input */
    maxLength?: number;
    /** Whether the input is focused */
    isActive?: boolean;
    /** Input type */
    type?: 'text' | 'password' | 'number';
    /** Input variant */
    variant?: 'standard' | 'netflix';
}
