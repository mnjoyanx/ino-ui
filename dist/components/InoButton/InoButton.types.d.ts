import { ReactNode } from "react";
import { MouseKeyboardEvent } from "../../types";
/**
 * Interface representing the properties for the InoButton component.
 */
export interface InoButtonProps {
    /**
     * Indicates whether the button is active.
     */
    isActive?: boolean;
    /**
     * The index of the button.
     */
    index?: number;
    /**
     * The content to be displayed inside the button.
     */
    children: ReactNode;
    /**
     * Callback function to be called when the button is clicked.
     * @param e - The mouse or keyboard event.
     * @param index - The index of the button.
     */
    onClick?: (e: MouseKeyboardEvent, index?: number) => void;
    /**
     * The type of the button.
     * @default 'button'
     */
    type?: 'button' | 'submit' | 'reset';
    /**
     * Indicates whether the button is disabled.
     */
    disabled?: boolean;
    /**
     * Additional class names to be applied to the button.
     */
    classNames?: string;
    /**
     * The variant of the button.
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'warning';
    /**
     * Callback function to be called when the left arrow key is pressed.
     * @param e - The mouse or keyboard event.
     * @param index - The index of the button.
     */
    onLeft?: (e: MouseKeyboardEvent, index?: number) => void;
    /**
     * Callback function to be called when the right arrow key is pressed.
     * @param e - The mouse or keyboard event.
     * @param index - The index of the button.
     */
    onRight?: (e: MouseKeyboardEvent, index?: number) => void;
    /**
     * Callback function to be called when the up arrow key is pressed.
     * @param e - The mouse or keyboard event.
     * @param index - The index of the button.
     */
    onUp?: (e: MouseKeyboardEvent, index?: number) => void;
    /**
     * Callback function to be called when the down arrow key is pressed.
     * @param e - The mouse or keyboard event.
     * @param index - The index of the button.
     */
    onDown?: (e: MouseKeyboardEvent, index?: number) => void;
    /**
     * Callback function to be called when the back action is triggered.
     * @param e - The mouse or keyboard event.
     * @param index - The index of the button.
     */
    onBack?: (e: MouseKeyboardEvent, index?: number) => void;
    /**
     * Callback function to be called when the button is hovered.
     * @param e - The mouse or keyboard event.
     * @param index - The index of the button.
     */
    onMouseEnter?: (e: MouseKeyboardEvent, index?: number) => void;
    /**
     * The size of the button.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Additional props to be passed to the button.
     */
    [key: string]: any;
}
