import { ToastType } from './InoToast.types';
export declare type ToastOptions = {
    type?: ToastType;
    message: string;
    duration?: number;
    position?: 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
};
declare type ToastInstance = {
    id: string;
    options: ToastOptions;
};
export declare const toast: {
    success: (message: string, options?: Partial<ToastOptions>) => string;
    error: (message: string, options?: Partial<ToastOptions>) => string;
    warning: (message: string, options?: Partial<ToastOptions>) => string;
    info: (message: string, options?: Partial<ToastOptions>) => string;
    dismiss: (id: string) => void;
    subscribe: (listener: (toasts: ToastInstance[]) => void) => () => void;
};
export {};
