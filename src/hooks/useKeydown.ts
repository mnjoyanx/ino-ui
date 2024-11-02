import { useEffect, useCallback } from "react";
import { checkKey } from "../utils/keys";

interface KeydownProps {
    [key: string]: ((e: KeyboardEvent) => void) | boolean | undefined;
    number?: ((e: KeyboardEvent) => void) | undefined;
    isActive: boolean;
}

function useKeydown(props: KeydownProps): void {
    const handleKeydown = useCallback((e: KeyboardEvent): void => {
        e.preventDefault();
        let key = checkKey(e);

        if (key && !isNaN(Number(key)) && typeof props["number"] === "function") {
            key = "number";
        }

        if (typeof props[key] === "function") {
            (props[key] as (e: KeyboardEvent) => void)(e);
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
