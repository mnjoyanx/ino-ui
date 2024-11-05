import { MouseKeyboardEvent } from '../types';
export interface MappedKeydownProps {
    isActive: boolean;
    onOk?: (e: MouseKeyboardEvent, item?: any, index?: number) => void;
    onBack?: (e: MouseKeyboardEvent, index?: number) => void;
    onLeft?: (e: MouseKeyboardEvent, index?: number) => void;
    onRight?: (e: MouseKeyboardEvent, index?: number) => void;
    onUp?: (e: MouseKeyboardEvent, index?: number) => void;
    onDown?: (e: MouseKeyboardEvent, index?: number) => void;
    onMouseEnter?: (e: MouseKeyboardEvent, index?: number) => void;
    index?: number;
    item?: any;
}
export declare function useMappedKeydown(props: MappedKeydownProps): void;