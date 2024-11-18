import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from './toast';
import { InoToast } from './InoToast';

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<any[]>([]);

  useEffect(() => {
    return toast.subscribe(setToasts);
  }, []);

  return (
    <>
      {children}
      {createPortal(
        <div className="ino-toast-container">
          {toasts.map(toast => (
            <InoToast
              key={toast.id}
              message={toast.options.message}
              type={toast.options.type}
              position={toast.options.position}
              isVisible={true}
              onClose={() => toast.dismiss(toast.id)}
            />
          ))}
        </div>,
        document.body
      )}
    </>
  );
};
