import { useEffect, useCallback } from "react";
import { checkKey } from "../utils/keys";

interface KeydownProps {
    [key: string]: ((e: KeyboardEvent) => void) | boolean | undefined | number;
    number?: ((e: KeyboardEvent) => void) | undefined;
    isActive: boolean;
    debounce?: number;
}

function useKeydown(props: KeydownProps): void {

    let pressedKey = {} as { [key: string]: boolean };
    let timeout: NodeJS.Timeout | undefined;

    const handleKeydown = useCallback((e: KeyboardEvent): void => {
        e.preventDefault();
        let key = checkKey(e);

        if (key && !isNaN(Number(key)) && typeof props["number"] === "function") {
            key = "number";
        }

        if (typeof props[key] === "function") {
            (props[key] as (e: KeyboardEvent) => void)(e);
        }

        let isPressed = pressedKey[key];

        if (isPressed) {
            if (timeout) return;

            timeout = setTimeout(() => {
                pressedKey[key] = false;
                timeout = undefined;
            }, props.debounce || 100);
        } else {
            pressedKey[key] = true;
        }
    }, [props]);

    const handleKeyup = useCallback((e: KeyboardEvent): void => {
        e.preventDefault();
        let key = checkKey(e);

        if (key) {
            pressedKey[key] = false;
            clearTimeout(timeout);
            timeout = undefined;
        }
    }, [props]);

    useEffect(() => {
        if (props.isActive) {
            window.addEventListener("keydown", handleKeydown);
            window.addEventListener("keyup", handleKeyup);
        }



        return () => {
            window.removeEventListener("keydown", handleKeydown);
            window.removeEventListener("keyup", handleKeyup);
        };
    }, [props.isActive, handleKeydown]);
}

export default useKeydown;
