import React, { ReactElement, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from './Modal.types';
import useKeydown from '../../hooks/useKeydown';
import { InoButton } from '../InoButton/Index';

const ModalPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const modalRoot = document.body;
  return createPortal(children, modalRoot);
};

/**
 * Modal component for displaying content in an overlay.
 *
 * This component provides a customizable modal dialog with optional primary and secondary action buttons.
 * It supports keyboard navigation and can be controlled via props.
 *
 * @component
 * @example
 * ```jsx
 * <Modal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   title="Example Modal"
 *   okBtnText="Save"
 *   onOk={() => handleSave()}
 *   cancelBtnText="Cancel"
 * >
 *   <p>This is the modal content.</p>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  classNames = '',
  okBtnText,
  onOk,
  cancelBtnText,
  onCancel,
  showCloseIcon = false,
  closeOnOverlayClick = true,
  onMouseEnter,
  onMouseLeave,
  size = 'small',
}) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handlePrimaryAction = useCallback(() => {
    if (onOk) {
      onOk();
    } else {
      handleClose();
    }
  }, [onOk, handleClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        handleClose();
      }
    },
    [closeOnOverlayClick, handleClose]
  );

  const handleSecondaryAction = useCallback(() => {
    if (onCancel) {
      onCancel();
    } else {
      handleClose();
    }
  }, [onCancel, handleClose]);

  const keyDownOptions = {
    isActive: isOpen,
    back: handleClose,
    ok: () => {
      if (activeButtonIndex === 0) {
        handleSecondaryAction();
      } else if (activeButtonIndex === 1) {
        handlePrimaryAction();
      }
    },
    left: () => setActiveButtonIndex(prev => Math.max(prev - 1, 0)),
    right: () => setActiveButtonIndex(prev => Math.min(prev + 1, 1)),
  };

  useKeydown(keyDownOptions);

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div
        className={`ino-modal-overlay ${classNames}`}
        onClick={handleOverlayClick}
      >
        <div className={`ino-modal ino-modal--${size}`}>
          <div className="ino-modal-header">
            <h2 className="ino-modal-title">{title}</h2>
            {showCloseIcon && (
              <button className="ino-modal-close" onClick={handleClose}>
                &times;
              </button>
            )}
          </div>
          <div className="ino-modal-content">{children}</div>
          {(okBtnText || cancelBtnText) && (
            <div className="ino-modal-footer">
              {cancelBtnText && (
                <InoButton
                  index={0}
                  isActive={activeButtonIndex === 0}
                  variant="outline"
                  size="small"
                  onClick={handleSecondaryAction}
                  onMouseEnter={(e, index) => {
                    setActiveButtonIndex(0);
                    if (onMouseEnter) onMouseEnter(e, index);
                  }}
                  onMouseLeave={(e, index) => {
                    if (onMouseLeave) onMouseLeave(e, index);
                  }}
                >
                  {cancelBtnText as ReactElement}
                </InoButton>
              )}
              {okBtnText && (
                <InoButton
                  index={1}
                  isActive={activeButtonIndex === 1}
                  variant="primary"
                  size="small"
                  classNames="ok-btn"
                  onClick={handlePrimaryAction}
                  onMouseEnter={(e, index) => {
                    setActiveButtonIndex(1);
                    if (onMouseEnter) onMouseEnter(e, index);
                  }}
                  onMouseLeave={(e, index) => {
                    if (onMouseLeave) onMouseLeave(e, index);
                  }}
                >
                  {okBtnText as ReactElement}
                </InoButton>
              )}
            </div>
          )}
        </div>
      </div>
    </ModalPortal>
  );
};
