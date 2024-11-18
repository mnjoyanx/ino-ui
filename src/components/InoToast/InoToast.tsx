import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { InoToastProps } from './InoToast.types';
import '../../styles/InoToast.css';

export const InoToast: React.FC<InoToastProps> = ({
  message,
  type = 'info',
  position = 'bottom',
  duration = 3000,
  isVisible,
  onClose,
  classNames = '',
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const toastContent = (
    <div
      className={`ino-toast ino-toast--${type} ino-toast--${position} ${classNames}`}
      role="alert"
    >
      <div className="ino-toast__content">{message}</div>
    </div>
  );

  // Create portal
  return ReactDOM.createPortal(toastContent, document.body);
};
