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
     * Flag indicating if the ListView should loop.
     */
    loop?: boolean;
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

