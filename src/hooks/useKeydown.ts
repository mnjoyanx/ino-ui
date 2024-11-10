import { useEffect, useCallback } from "react";
import { checkKey } from "../utils/keys";

interface KeydownProps {
    [key: string]: ((e: KeyboardEvent) => void) | boolean | undefined;
    number?: ((e: KeyboardEvent) => void) | undefined;
    letter?: ((e: KeyboardEvent) => void) | undefined;
    isActive: boolean;
}

function useKeydown(props: KeydownProps): void {
    const handleKeydown = useCallback((e: KeyboardEvent): void => {
        if (!props.isActive) return;

        const key = e.key.toLowerCase();

        // Handle numbers (both numpad and regular)
        if (/^\d$/.test(key) && typeof props.number === "function") {
            props.number(e);
            return;
        }

        // Handle letters
        if (/^[a-z]$/.test(key) && typeof props.letter === "function") {
            props.letter(e);
            return;
        }

        // Handle special keys through checkKey
        const specialKey = checkKey(e);
        if (specialKey && typeof props[specialKey] === "function") {
            (props[specialKey] as (e: KeyboardEvent) => void)(e);
        }
    }, [props]);

    useEffect(() => {
        if (props.isActive) {
            window.addEventListener("keydown", handleKeydown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [props.isActive, handleKeydown]);
}

export default useKeydown;
