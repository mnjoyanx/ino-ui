export interface InoPlayerProgressProps {
    /** Current progress (0-100) */
    value: number;
    /** Buffered progress (0-100) */
    buffered?: number;
    /** Whether the progress bar is active */
    isActive?: boolean;
    /** Called when progress changes */
    onChange?: (value: number) => void;
    /** Called when dragging starts */
    onDragStart?: () => void;
    /** Called when dragging ends */
    onDragEnd?: () => void;
    /** Custom class names */
    classNames?: string;
    /** Whether to show time tooltip */
    showTooltip?: boolean;
    /** Total duration in seconds */
    duration?: number;
    /** Current time in seconds */
    currentTime?: number;
}
