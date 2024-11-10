interface KeydownProps {
    [key: string]: ((e: KeyboardEvent) => void) | boolean | undefined;
    number?: ((e: KeyboardEvent) => void) | undefined;
    letter?: ((e: KeyboardEvent) => void) | undefined;
    isActive: boolean;
}
declare function useKeydown(props: KeydownProps): void;
export default useKeydown;
