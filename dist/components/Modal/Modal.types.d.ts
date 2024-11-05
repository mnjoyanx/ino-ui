import type { ReactNode } from 'react';
/**
 * ModalProps interface defines the properties for the Modal component.
 */
export interface ModalProps {
    /** Determines if the modal is open or closed */
    isOpen: boolean;
    /** Function to call when the modal is closed */
    onClose: () => void;
    /** The title of the modal */
    title: string;
    /** The content of the modal */
    children: ReactNode;
    /** Additional CSS classes for styling */
    classNames?: string;
    /** Text for the primary action button (e.g., "OK" or "Submit") */
    okBtnText?: string;
    /** Function to call when the primary button is clicked */
    onOk?: () => void;
    /** Text for the secondary action button (e.g., "Cancel" or "Close") */
    cancelBtnText?: string;
    /** Function to call when the secondary button is clicked */
    onCancel?: () => void;
    /** Determines if the close icon (X) should be shown */
    showCloseIcon?: boolean;
    /** Function to call when the mouse enters the primary button */
    onPrimaryMouseEnter?: () => void;
    /** Function to call when the mouse leaves the primary button */
    onPrimaryMouseLeave?: () => void;
    /** Function to call when the mouse enters the secondary button */
    onSecondaryMouseEnter?: () => void;
    /** Function to call when the mouse leaves the secondary button */
    onSecondaryMouseLeave?: () => void;
}
