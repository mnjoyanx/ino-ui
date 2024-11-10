import { MouseKeyboardEvent } from "../types";
import useKeydown from './useKeydown';

export interface MappedKeydownProps {
    isActive: boolean;
    onOk?: (e: MouseKeyboardEvent, item?: any, index?: number) => void;
    onBack?: (e: MouseKeyboardEvent, index?: number) => void;
    onLeft?: (e: MouseKeyboardEvent, index?: number) => void;
    onRight?: (e: MouseKeyboardEvent, index?: number) => void;
    onUp?: (e: MouseKeyboardEvent, index?: number) => void;
    onDown?: (e: MouseKeyboardEvent, index?: number) => void;
    onLetter?: (e: MouseKeyboardEvent, index?: number) => void;
    onNumber?: (e: MouseKeyboardEvent, index?: number) => void;
    onMouseEnter?: (e: MouseKeyboardEvent, index?: number) => void;
    onMouseLeave?: (e: MouseKeyboardEvent, index?: number) => void;
    onRemove?: (e: MouseKeyboardEvent, index?: number) => void;
    index?: number;
    item?: any;
}

export function useMappedKeydown(props: MappedKeydownProps) {
    const { isActive, onOk, onBack, onLeft, onRight, onUp, onDown, onMouseEnter, onMouseLeave, onLetter, onNumber, onRemove, index, item } = props;

    useKeydown({
        isActive,
        ok: (e) => {
            if (onOk) {
                onOk(e, item, index);
            }
        },
        back: (e) => {
            if (onBack) {
                onBack(e, index);
            }
        },
        left: (e) => {
            if (onLeft) {
                onLeft(e, index);
            }
        },
        right: (e) => {
            if (onRight) {
                onRight(e, index);
            }
        },
        up: (e) => {
            if (onUp) {
                onUp(e, index);
            }
        },
        down: (e) => {
            if (onDown) {
                onDown(e, index);
            }
        },
        mouseEnter: (e) => {
            if (onMouseEnter) {
                onMouseEnter(e, index);
            }
        },
        mouseLeave: (e) => {
            if (onMouseLeave) {
                onMouseLeave(e, index);
            }
        },
        letter: (e) => {
            console.log('letter', e);
            if (onLetter) {
                onLetter(e, index);
            }
        },
        number: (e) => {
            if (onNumber) {
                onNumber(e, index);
            }
        },
        remove: (e) => {
            if (onRemove) {
                onRemove(e, index);
            }
        },
    });
}
