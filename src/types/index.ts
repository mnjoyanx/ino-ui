// Re-export all component types
export type {
    // Keyboard types
    KeyboardVariant,
    KeyboardLayout,
    KeyboardKey,
    KeyboardLayouts,
    InoKeyboardProps
} from '../components/InoKeyboard/InoKeyboard.types';

export type MouseKeyboardEvent = React.MouseEvent<HTMLButtonElement> | KeyboardEvent;

// Button types
export type { InoButtonProps } from '../components/InoButton/InoButton.types';