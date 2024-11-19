import { NavigableComponentProps } from '../../types/base';

export interface ScrollViewProps extends NavigableComponentProps {
    /** The content to be displayed in the scroll view */
    children: React.ReactNode;

    /** Callback fired when scroll reaches the bottom */
    onReachBottom?: () => void;

    /** Callback fired when scroll starts */
    onStartScroll?: () => void;

    /** Callback fired when scroll ends */
    onEndScroll?: () => void;

    /** Scroll step size in pixels */
    scrollStep?: number;

    /** Whether to show scroll indicators */
    showIndicators?: boolean;

    /** Scroll behavior */
    behavior?: 'smooth' | 'auto';

    /** Scroll direction */
    direction?: 'vertical' | 'horizontal' | 'both';

    /** Whether to enable infinite scroll */
    infiniteScroll?: boolean;

    /** Height of the scroll view */
    height?: number | string;

    /** Width of the scroll view */
    width?: number | string;
} 