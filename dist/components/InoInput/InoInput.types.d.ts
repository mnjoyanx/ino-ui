/// <reference types="react" />
import { MouseKeyboardEvent } from '../../types';
import { BaseInputProps } from '../../types/base';
export interface InoInputProps extends BaseInputProps {
    showCursor?: boolean;
    type?: 'text' | 'password' | 'number';
    variant?: 'standard' | 'outlined';
    onFocus?: (e: React.FocusEvent | MouseKeyboardEvent, index?: number) => void;
    onBlur?: (e: React.FocusEvent | MouseKeyboardEvent, index?: number) => void;
}
