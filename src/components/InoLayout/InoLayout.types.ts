import { ReactNode } from 'react';
import { MouseKeyboardEvent } from '../../types';

export interface InoRowProps {
    children: ReactNode;
    /** Whether the row navigation is active */
    isActive?: boolean;
    /** Index of the row */
    index?: number;
    /** Whether to enable infinite navigation */
    infinite?: boolean;
    /** Additional class names */
    classNames?: string;
    /** Called when active column changes */
    onActiveChange?: (index: number) => void;
    /** Navigation callbacks */
    onUp?: (e: MouseKeyboardEvent, index?: number) => void;
    onDown?: (e: MouseKeyboardEvent, index?: number) => void;
    onLeft?: (e: MouseKeyboardEvent, index?: number) => void;
    onRight?: (e: MouseKeyboardEvent, index?: number) => void;
    onOk?: (e: MouseKeyboardEvent, index?: number) => void;
}

export interface InoColProps {
    children: ReactNode;
    /** Whether the column navigation is active */
    isActive?: boolean;
    /** Index of the column */
    index?: number;
    /** Whether to enable infinite navigation */
    infinite?: boolean;
    /** Additional class names */
    classNames?: string;
    /** Called when active row changes */
    onActiveChange?: (index: number) => void;
    /** Navigation callbacks */
    onLeft?: (e: MouseKeyboardEvent, index?: number) => void;
    onRight?: (e: MouseKeyboardEvent, index?: number) => void;
    onUp?: (e: MouseKeyboardEvent, index?: number) => void;
    onDown?: (e: MouseKeyboardEvent, index?: number) => void;
    onOk?: (e: MouseKeyboardEvent, index?: number) => void;
}

// Create a wrapper component type for HTML elements
export interface InoElementWrapperProps {
    children: ReactNode;
    isActive?: boolean;
    index?: number;
    classNames?: string;
}