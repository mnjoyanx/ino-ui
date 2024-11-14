import { MouseKeyboardEvent } from '../../types';

export interface InoListItemProps {
    /** Item label/content */
    children: React.ReactNode;
    /** Whether the item is active */
    isActive?: boolean;
    /** Whether the item is disabled */
    disabled?: boolean;
    /** Optional icon component */
    icon?: React.ReactNode;
    /** Optional right-aligned content */
    rightContent?: React.ReactNode;
    /** Custom class name */
    className?: string;
    /** Navigation index */
    index?: number;
    /** Called when item is clicked/selected */
    onClick?: (e: React.MouseEvent, index?: number) => void;
    /** Navigation callbacks */
    onUp?: (e: MouseKeyboardEvent, index?: number) => void;
    onDown?: (e: MouseKeyboardEvent, index?: number) => void;
    onLeft?: (e: MouseKeyboardEvent, index?: number) => void;
    onRight?: (e: MouseKeyboardEvent, index?: number) => void;
    onOk?: (e: MouseKeyboardEvent, index?: number) => void;
} 