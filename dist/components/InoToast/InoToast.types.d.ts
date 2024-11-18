export declare type ToastType = 'success' | 'error' | 'warning' | 'info';
export declare type ToastPosition = 'top' | 'bottom';
export interface InoToastProps {
    /** Message to display */
    message: string;
    /** Type of toast */
    type?: ToastType;
    /** Position of toast */
    position?: ToastPosition;
    /** Duration in milliseconds */
    duration?: number;
    /** Whether the toast is visible */
    isVisible: boolean;
    /** Callback when toast closes */
    onClose?: () => void;
    /** Custom class names */
    classNames?: string;
}
