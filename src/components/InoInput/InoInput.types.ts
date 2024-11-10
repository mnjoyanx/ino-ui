import { MouseKeyboardEvent } from "../../types";

export interface InoInputProps {
    /** Value of the input */
    value?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Index of the input */
    index?: number;
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
    variant?: 'standard' | 'underlined';
    /** Called when value changes */
    onChange?: (value: string) => void;
    /** Called when input is focused */
    onFocus?: () => void;
    /** Called when input is blurred */
    onBlur?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when the OK button is pressed */
    onOk?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when the Back button is pressed */
    onBack?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when the Left button is pressed */
    onLeft?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when the Right button is pressed */
    onRight?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when the Up button is pressed */
    onUp?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when the Down button is pressed */
    onDown?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when the mouse enters the input */
    onMouseEnter?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when the mouse leaves the input */
    onMouseLeave?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when the paste event is triggered */
    onPaste?: (e: React.ClipboardEvent, index?: number) => void;
} 
