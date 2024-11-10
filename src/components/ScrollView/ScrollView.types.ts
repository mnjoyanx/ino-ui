export interface ScrollViewProps {
    /**
     * The content to be displayed in the scroll view
     */
    children: React.ReactNode;

    /**
     * Whether the scroll view is currently active/focused
     */
    isActive?: boolean;

    /**
     * Callback fired when scroll reaches the bottom
     */
    onReachBottom?: () => void;

    /**
     * Callback fired when scroll starts
     */
    onStartScroll?: () => void;

    /**
     * Callback fired when scroll ends
     */
    onEndScroll?: () => void;

    /**
     * Callback fired on scroll down navigation
     */
    onDown?: () => void;

    /**
     * Callback fired on scroll up navigation
     */
    onUp?: () => void;

    /**
     * Callback fired on OK/Enter action
     */
    onOk?: () => void;

    /**
     * Callback fired on Back/Escape action
     */
    onBack?: () => void;

    /**
     * Custom CSS classes
     */
    classNames?: string;

    /**
     * Scroll step size in pixels
     * @default 50
     */
    scrollStep?: number;

    /**
     * Whether to show scroll indicators
     * @default true
     */
    showScrollIndicators?: boolean;
} 