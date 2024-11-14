interface KeydownProps {
    [key: string]: ((e: KeyboardEvent) => void) | boolean | undefined | number;
    number?: ((e: KeyboardEvent) => void) | undefined;
    letter?: ((e: KeyboardEvent) => void) | undefined;
    remove?: ((e: KeyboardEvent) => void) | undefined;
    isActive: boolean;
    debounce?: number;
}
declare function useKeydown(props: KeydownProps): void;
export default useKeydown;
