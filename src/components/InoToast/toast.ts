import { ToastType } from './InoToast.types';

export type ToastOptions = {
    type?: ToastType;
    message: string;
    duration?: number;
    position?: 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
};

type ToastInstance = {
    id: string;
    options: ToastOptions;
};

let toasts: ToastInstance[] = [];
let listeners: ((toasts: ToastInstance[]) => void)[] = [];

const notify = (options: ToastOptions) => {
    const id = Math.random().toString(36).slice(2);
    const toast = { id, options };

    toasts = [...toasts, toast];
    listeners.forEach(listener => listener(toasts));

    if (options.duration !== 0) {
        setTimeout(() => {
            dismiss(id);
        }, options.duration || 3000);
    }

    return id;
};

const dismiss = (id: string) => {
    toasts = toasts.filter(toast => toast.id !== id);
    listeners.forEach(listener => listener(toasts));
};

export const toast = {
    success: (message: string, options?: Partial<ToastOptions>) =>
        notify({ type: 'success', message, ...options }),
    error: (message: string, options?: Partial<ToastOptions>) =>
        notify({ type: 'error', message, ...options }),
    warning: (message: string, options?: Partial<ToastOptions>) =>
        notify({ type: 'warning', message, ...options }),
    info: (message: string, options?: Partial<ToastOptions>) =>
        notify({ type: 'info', message, ...options }),
    dismiss,
    subscribe: (listener: (toasts: ToastInstance[]) => void) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }
}; 