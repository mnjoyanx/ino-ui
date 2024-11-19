import type { ReactElement, ReactNode } from 'react';
import { BaseProps } from '../../types/base';

/**
 * ModalProps interface defines the properties for the Modal component.
 */
export interface ModalProps extends BaseProps {
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
    okBtnText?: ReactElement | string;
    /** Determines if the modal should close when the overlay is clicked */
    closeOnOverlayClick?: boolean;
    /** Determines if the modal should be full size */
    size?: 'small' | 'mid' | 'large' | 'full';
    /** Function to call when the primary button is clicked */
    onOk?: () => void;
    /** Text for the secondary action button (e.g., "Cancel" or "Close") */
    cancelBtnText?: ReactElement | string;
    /** Function to call when the secondary button is clicked */
    onCancel?: () => void;
    /** Determines if the close icon (X) should be shown */
    showCloseIcon?: boolean;
    /** Function to call when the mouse enters the modal */
    onMouseEnter?: (e: React.MouseEvent, index?: number) => void;
    /** Function to call when the mouse leaves the modal */
    onMouseLeave?: (e: React.MouseEvent, index?: number) => void;
}
