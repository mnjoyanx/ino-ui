import { useEffect, useCallback, useRef } from "react";
import { checkKey } from "../utils/keys";

interface KeydownProps {
    [key: string]: ((e: KeyboardEvent) => void) | boolean | undefined | number;
    number?: ((e: KeyboardEvent) => void) | undefined;
    letter?: ((e: KeyboardEvent) => void) | undefined;
    remove?: ((e: KeyboardEvent) => void) | undefined;
    isActive: boolean;
    debounce?: number;
}

function useKeydown(props: KeydownProps): void {
    const pressed = useRef<{ [key: string]: boolean }>({});
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleKeydown = useCallback((e: KeyboardEvent): void => {
        if (!props.isActive) return;

        const key = e.key.toLowerCase();
        const specialKey = checkKey(e);

        // Prevent default browser behavior
        e.preventDefault();

        // If key is already pressed and interval exists, return
        if (pressed.current[key] && intervalRef.current) return;

        const executeKeyHandler = (handlerKey: string) => {
            if (typeof props[handlerKey] === "function") {
                (props[handlerKey] as (e: KeyboardEvent) => void)(e);
            }
        };

        // Handle the initial key press
        if (!pressed.current[key]) {
            pressed.current[key] = true;

            if (/^\d$/.test(key) && props.number) {
                executeKeyHandler('number');
            } else if (/^[a-z]$/.test(key) && props.letter) {
                executeKeyHandler('letter');
            } else if (specialKey && props[specialKey]) {
                executeKeyHandler(specialKey);
            }
        }

        console.log(props.debounce, 'debounce')

        // Set up debounced repeat
        intervalRef.current = setInterval(() => {
            if (/^\d$/.test(key) && props.number) {
                executeKeyHandler('number');
            } else if (/^[a-z]$/.test(key) && props.letter) {
                executeKeyHandler('letter');
            } else if (specialKey && props[specialKey]) {
                executeKeyHandler(specialKey);
            }
        }, props.debounce || 100);
    }, [props]);

    const handleKeyup = useCallback((e: KeyboardEvent): void => {
        const key = e.key.toLowerCase();
        pressed.current[key] = false;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (props.isActive) {
            window.addEventListener("keydown", handleKeydown);
            window.addEventListener("keyup", handleKeyup);
        }

        return () => {
            window.removeEventListener("keydown", handleKeydown);
            window.removeEventListener("keyup", handleKeyup);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [props.isActive, handleKeydown, handleKeyup]);
}

export default useKeydown;
