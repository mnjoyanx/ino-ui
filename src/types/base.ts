import { MouseKeyboardEvent } from './utils';
import { ReactNode } from 'react';

// Base interface for common props across all components
export interface BaseProps {
    /** Children elements */
    children?: ReactNode;
    /** Custom class names */
    classNames?: string;
    /** Custom styles */
    style?: React.CSSProperties;
}

// Base interface for navigation-enabled components
export interface NavigationProps extends BaseProps {
    /** Whether the component is currently active/focused */
    isActive?: boolean;
    /** Index for navigation context */
    index?: number;
    /** Whether to enable infinite navigation */
    infinite?: boolean;
}

// Base interface for interactive components
export interface InteractionProps {
    onLeft?: (e: KeyboardEvent, index?: number) => void;
    onRight?: (e: KeyboardEvent, index?: number) => void;
    onUp?: (e: KeyboardEvent, index?: number) => void;
    onDown?: (e: KeyboardEvent, index?: number) => void;
    onOk?: (e: KeyboardEvent, index?: number) => void;
    onBack?: (e: KeyboardEvent, index?: number) => void;
    onMouseEnter?: (e: React.MouseEvent, index?: number) => void;
    onMouseLeave?: (e: React.MouseEvent, index?: number) => void;
}

// Combined base interface for navigable and interactive components
export interface NavigableComponentProps extends NavigationProps, InteractionProps { }

// Base interface for input-like components
export interface BaseInputProps extends NavigableComponentProps {
    /** Input value */
    value?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Whether the input is disabled */
    disabled?: boolean;
    /** Input change handler */
    onChange?: (value: string, e?: MouseKeyboardEvent) => void;
    /** Maximum length of input */
    maxLength?: number;
    /** Input variant */
    variant?: 'standard' | 'outlined';
    /** Input type */
    type?: 'text' | 'password' | 'number';
} 