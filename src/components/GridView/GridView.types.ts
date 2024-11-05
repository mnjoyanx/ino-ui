import React from "react";

export interface GridViewProps {
    /**
     * Unique identifier for the GridView component.
     */
    id: string;
    /**
     * Optional unique key prefix for each item in the GridView.
     */
    uniqueKey?: string;
    /**
     * Flag indicating if native control should be used for scrolling.
     */
    nativeControle?: boolean;
    /**
     * Optional debounce time in milliseconds for scroll events.
     */
    debounce?: number;
    /**
     * Optional scroll offset in pixels.
     */
    scrollOffset?: number;
    /**
     * Number of items per row in the GridView.
     */
    rowItemsCount: number;
    /**
     * Total number of rows in the GridView.
     */
    rowCount: number;
    /**
     * Optional starting buffer index for the GridView.
     */
    bufferStart?: number;
    /**
     * Optional ending buffer index for the GridView.
     */
    bufferEnd?: number;
    /**
     * Total number of items in the GridView.
     */
    itemsTotal: number;
    /**
     * Width of each item in the GridView.
     */
    itemWidth: number;
    /**
     * Height of each item in the GridView.
     */
    itemHeight: number;
    /**
     * Flag indicating if the GridView is currently active.
     */
    isActive: boolean;
    /**
     * Optional initial active index for the GridView.
     */
    initialActiveIndex?: number;
    /**
     * Direction of the GridView, either 'ltr' (left to right) or 'rtl' (right to left).
     */
    direction?: "ltr" | "rtl";
    /**
     * Callback function for when an item is hovered.
     * @param index - The index of the hovered item.
     */
    onMouseEnter?: (index: number) => void;
    /**
     * Callback function for when the row changes.
     * @param row - The new row index.
     */
    onChangeRow?: (row: number) => void;
    /**
     * Callback function for when the up navigation is triggered.
     */
    onUp?: () => void;
    /**
     * Callback function for when the down navigation is triggered.
     */
    onDown?: (activeIndex: number, prevActiveIndex: number) => void;
    /**
     * Callback function for when the left navigation is triggered.
     */
    onLeft?: () => void;
    /**
     * Callback function for when the right navigation is triggered.
     */
    onRight?: () => void;
    /**
     * Callback function for when the ok navigation is triggered.
     */
    onOk?: (item: any, index: number) => void;
    /**
     * Callback function for when the back navigation is triggered.
     */
    onBack?: () => void;
    /**
     * Function to render each item in the GridView.
     * @param props - The props for the item.
     * @returns The rendered item.
     */
    renderItem: (props: ItemProps) => React.ReactNode;
    /**
     * Array of data items to be rendered in the GridView.
     */
    data: any[];
}

export interface ItemProps {
    key: string;
    index: number;
    style: React.CSSProperties;
    isActive: boolean;
    item: any;
    onMouseEnter?: () => void;
}
