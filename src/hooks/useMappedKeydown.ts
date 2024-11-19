import useKeydown from './useKeydown';

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
    // onMouseEnter?: (e: React.MouseEvent, index?: number) => void;
    // onMouseLeave?: (e: React.MouseEvent, index?: number) => void;
    onRemove?: (e: KeyboardEvent, index?: number) => void;
    index?: number;
    item?: any;
}

export function useMappedKeydown(props: MappedKeydownProps) {
    const { isActive, onOk, onBack, onLeft, onRight, onUp, onDown, onLetter, onNumber, onRemove, index, item } = props;

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
        // mouseEnter: (e) => {
        //     if (onMouseEnter) {
        //         onMouseEnter(e, index);
        //     }
        // },
        // mouseLeave: (e) => {
        //     if (onMouseLeave) {
        //         onMouseLeave(e, index);
        //     }
        // },
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