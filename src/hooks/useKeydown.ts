// import { useEffect, useCallback } from "react";
// import { checkKey } from "../utils/keys";

// interface KeydownProps {
//     [key: string]: ((e: KeyboardEvent) => void) | boolean | undefined | number;
//     number?: ((e: KeyboardEvent) => void) | undefined;
//     isActive: boolean;
//     debounce?: number;
// }

// function useKeydown(props: KeydownProps): void {

//     let pressedKey = {} as { [key: string]: boolean };
//     let timeout: ReturnType<typeof setTimeout> | undefined;

//     const handleKeydown = useCallback((e: KeyboardEvent): boolean => {
//         console.log('handle key down')
//         // e.preventDefault();
//         let key = checkKey(e);

//         if (key && !isNaN(Number(key)) && typeof props["number"] === "function") {
//             key = "number";
//         }
//         console.log('log 2')

//         if (props.keydown && typeof props.keydown === 'function') return false;
//         console.log('log 3')

//         if (!props[key]) return false;

//         console.log('log 4')

//         let isPressed = pressedKey[key];

//         if (isPressed) {
//             console.log('pressed')
//             if (timeout) return false;

//             console.log(props.debounce, '---', props[key])
//             timeout = setInterval(() => {
//                 pressedKey[key] = false;
//                 timeout = undefined;
//                 if (props[key] && typeof props[key] === 'function') {
//                     (props[key] as (e: KeyboardEvent) => void)(e);
//                 }
//             }, props.debounce || 100);
//         } else {
//             console.log("propsss else")
//             pressedKey[key] = true;
//             if (props[key] && typeof props[key] === 'function') {
//                 (props[key] as (e: KeyboardEvent) => void)(e);
//             }
//         }

//         return false;
//     }, [props]);

//     const handleKeyup = useCallback((e: KeyboardEvent): boolean => {
//         // e.preventDefault();
//         let key = checkKey(e);

//         console.log(key, '----', pressedKey[key], '---', key, '---', timeout)

//         if (key) {
//             pressedKey[key] = false;
//             clearInterval(timeout);
//             timeout = undefined;
//         }

//         return false;
//     }, [props]);

//     useEffect(() => {
//         if (props.isActive) {
//             window.addEventListener("keydown", handleKeydown);
//             window.addEventListener("keyup", handleKeyup);
//         }

//         return () => {
//             window.removeEventListener("keydown", handleKeydown);
//             window.removeEventListener("keyup", handleKeyup);
//         };
//     }, [props.isActive, handleKeydown]);
// }

// export default useKeydown;


import { useEffect, useCallback } from "react";
import { checkKey } from "../utils/keys";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useKeydown(props: any) {


    const rtlMode = localStorage.getItem('rtlMode') === 'false';

    useEffect(() => {

        let pressed = {};
        let interval: ReturnType<typeof setTimeout> | null = null;

        const handleKeydown = (e: KeyboardEvent) => {

            // e.preventDefault();

            let key = checkKey(e, rtlMode);

            if (props.keydown && typeof props.keydown == "function" && props.keydown(e, key)) return

            if (!props[key]) return;

            let isPressed = pressed[key];

            if (isPressed) {

                if (interval) return;

                interval = setInterval(() => {
                    props[key](e);
                }, props.debounce || 100);

            } else {

                pressed[key] = true;
                props[key](e);

            }

            return false;

        }

        const handleKeyup = (e) => {

            // e.preventDefault();

            let key = checkKey(e, rtlMode);
            pressed[key] = false;
            clearInterval(interval);
            interval = null;
        }

        let options = props.capture || false;

        if (props.isActive) {
            document.addEventListener('keydown', handleKeydown, options);
            document.addEventListener('keyup', handleKeyup, options);
        } else {
            document.removeEventListener('keydown', handleKeydown, options);
            document.removeEventListener('keyup', handleKeyup, options);
        }

        return () => {
            document.removeEventListener('keydown', handleKeydown, options);
            document.removeEventListener('keyup', handleKeyup, options);
            clearInterval(interval);
            interval = null;
        }

    }, [props]);

}
