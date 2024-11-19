/// <reference types="react" />
import { NavigableComponentProps } from '../../types/base';
import { MouseKeyboardEvent } from "../../types";
/**
 * Interface representing the properties for the InoButton component.
 */
export interface InoButtonProps extends NavigableComponentProps {
    /**
     * The content to be displayed inside the button.
     */
    children: React.ReactElement;
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
     * The size of the button.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The variant of the button.
     * @default 'primary'
     */
    variant?: 'primary' | 'outline' | 'ghost';
}
