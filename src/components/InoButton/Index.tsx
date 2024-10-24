import React from 'react';
import '../../styles/InoButton.css';

interface InoButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export const InoButton: React.FC<InoButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`ino-button ${className}`}
    >
      {children}
    </button>
  );
};
