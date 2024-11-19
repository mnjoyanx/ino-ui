/// <reference types="react" />
export interface MappedKeydownProps {
    isActive: boolean;
    onOk?: (e: KeyboardEvent | React.MouseEvent<any>, item?: any, index?: number) => void;
    onBack?: (e: KeyboardEvent, index?: number) => void;
    onLeft?: (e: KeyboardEvent, index?: number) => void;
    onRight?: (e: KeyboardEvent, index?: number) => void;
    onUp?: (e: KeyboardEvent, index?: number) => void;
    onDown?: (e: KeyboardEvent, index?: number) => void;
    onLetter?: (e: KeyboardEvent, index?: number) => void;
    onNumber?: (e: KeyboardEvent, index?: number) => void;
    onRemove?: (e: KeyboardEvent, index?: number) => void;
    index?: number;
    item?: any;
}
export declare function useMappedKeydown(props: MappedKeydownProps): void;
