import React from "react";

/**
 * Interface for ListView component props.
 */
export interface ListViewProps {
    /**
     * Unique identifier for the ListView component.
     */
    id: string;
    /**
     * Optional unique key prefix for each item in the ListView.
     */
    uniqueKey?: string;
    /**
     * Type of list orientation, either 'horizontal' or 'vertical'.
     */
    listType?: "horizontal" | "vertical";
    /**
     * Flag indicating if native control should be used for scrolling.
     */
    nativeControle?: boolean;
    /**
     * Optional debounce time in milliseconds for scroll events.
     */
    debounce?: number;
    /**
     * Number of items currently visible in the ListView.
     */
    itemsCount: number;
    /**
     * Total number of items in the ListView.
     */
    itemsTotal: number;
    /**
     * Buffer size for items before and after the visible items.
     */
    buffer: number;
    /**
     * Width of each item in the ListView.
     */
    itemWidth: number;
    /**
     * Height of each item in the ListView.
     */
    itemHeight: number;
    /**
     * Flag indicating if the ListView is currently active.
     */
    isActive: boolean;
    /**
     * Optional initial active index for the ListView.
     */
    initialActiveIndex?: number;
    /**
     * Gap between items in the ListView.
     */
    gap?: number;
    /**
     * Optional index to scroll back to when the back button is pressed.
     */
    onBackScrollIndex?: number | null;
    /**
     * Starting index for scrolling.
     */
    startScrollIndex?: number;
    /**
     * Direction of the ListView, either 'ltr' (left to right) or 'rtl' (right to left).
     */
    direction?: "ltr" | "rtl";
    /**
     * Callback function for when an item is hovered.
     * @param index - The index of the hovered item.
     */
    onMouseEnter?: (index: number) => void;
    /**
     * Callback function for when the up navigation is triggered.
     */
    onUp?: () => void;
    /**
     * Callback function for when the down navigation is triggered.
     */
    onDown?: () => void;
    /**
     * Callback function for when the left navigation is triggered.
     */
    onLeft?: () => void;
    /**
     * Callback function for when the right navigation is triggered.
     */
    onRight?: () => void;
    /**
     * Callback function for when the back navigation is triggered.
     */
    onBack?: () => void;
    /**
     * Function to render each item in the ListView.
     * @param props - The props for the item.
     * @returns The rendered item.
     */
    renderItem: (props: ItemProps) => React.ReactNode;
    /**
     * Array of data items to be rendered in the ListView.
     */
    data: any[];
    /**
     * Configuration for navigation arrows
     */
    arrows?: ArrowProps;
    /**
     * Configuration for edge scroll behavior
     */
    edgeScroll?: EdgeScrollProps;
}

export interface ItemProps {
    key: string;
    index: number;
    style: React.CSSProperties;
    isActive: boolean;
    item: any;
    onUp?: () => void;
    onDown?: () => void;
    onLeft?: () => void;
    onRight?: () => void;
    onMouseEnter: () => void;
}

export interface ArrowProps {
    /**
     * Whether to show the arrows
     */
    show?: boolean;
    /**
     * Icon for the start/left/up arrow
     */
    startIcon?: React.ReactNode;
    /**
     * Icon for the end/right/down arrow
     */
    endIcon?: React.ReactNode;
    /**
     * Custom styles for the arrows
     */
    style?: React.CSSProperties;
    /**
     * Additional CSS class names
     */
    className?: string;
}

export interface NavigationArrowProps {
    /**
     * Direction of the navigation arrow ('start' for left/up, 'end' for right/down)
     */
    direction: 'start' | 'end';
    /**
     * Icon element to display as the arrow
     */
    icon: React.ReactNode;
    /**
     * Click handler for the arrow
     */
    onClick: () => void;
    /**
     * Whether to show or hide the arrow
     */
    show: boolean;
    /**
     * Orientation of the list ('horizontal' or 'vertical')
     */
    listType: 'horizontal' | 'vertical';
    /**
     * Custom styles to apply to the arrow
     */
    customStyle?: React.CSSProperties;
    /**
     * Additional CSS class names
     */
    className?: string;
}

export interface EdgeScrollProps {
    /**
     * Enable/disable edge scrolling on hover
     */
    enabled?: boolean;
    /**
     * Interval between scrolls in milliseconds
     */
    interval?: number;
    /**
     * Initial delay before scrolling starts (in milliseconds)
     */
    startDelay?: number;
}

