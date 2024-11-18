import React from 'react';
interface InoProtectInputProps {
    onChange?: (value: string) => void;
    count?: number;
    withLetters?: boolean;
    keyboard?: boolean;
    onComplete?: (value: string) => void;
    isActive?: boolean;
    onBack?: () => void;
}
export declare const InoProtectInput: React.FC<InoProtectInputProps>;
export {};
