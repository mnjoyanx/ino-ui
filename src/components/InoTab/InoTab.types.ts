import { MouseKeyboardEvent } from "../../types";

export interface InoTabProps {
    /** Label text for the tab */
    label: string;
    /** Whether the tab is currently active */
    isActive?: boolean;
    /** Whether the tab is disabled */
    disabled?: boolean;
    /** Index of the tab */
    index?: number;
    /** Additional class names */
    classNames?: string;
    /** Visual variant of the tab */
    variant?: 'primary' | 'secondary';
    /** Size variant of the tab */
    size?: 'small' | 'medium' | 'large';
    /** Called when tab is clicked */
    onClick?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when left arrow is pressed */
    onLeft?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when right arrow is pressed */
    onRight?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when up arrow is pressed */
    onUp?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when down arrow is pressed */
    onDown?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when back/escape is pressed */
    onBack?: (e: MouseKeyboardEvent, index?: number) => void;
    /** Called when mouse enters the tab */
    onMouseEnter?: (e: MouseKeyboardEvent, index?: number) => void;
}

export interface InoTabsProps {
    /** Tab components */
    children: React.ReactElement<InoTabProps> | React.ReactElement<InoTabProps>[];
    /** Index of the currently active tab */
    activeIndex?: number;
    /** Called when active tab changes */
    onChange?: (index: number) => void;
    /** Visual variant applied to all tabs */
    variant?: 'primary' | 'secondary';
    /** Size variant applied to all tabs */
    size?: 'small' | 'medium' | 'large';
    /** Additional class names */
    classNames?: string;
} 