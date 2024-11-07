import React from "react";
export interface GridViewProps {
    /**
     * Unique identifier for the GridView component.
     */
    id: string;
    /**
     * Flag indicating if the GridView is currently active.
     */
    isActive: boolean;
    /**
     * Array of data items to be rendered in the GridView.
     */
    data: any[];
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
    scrollOffset?: number;
    /**
     * Number of items per row in the GridView.
     */
    rowItemsCount?: number;
    /**
     * Total number of rows in the GridView.
     */
    rowCount?: number;
    /**
     * Optional starting buffer index for the GridView.
     */
    bufferStart?: number;
    /**
     * Optional ending buffer index for the GridView.
     */
    bufferEnd?: number;
    /**
     * Width of each item in the GridView.
     */
    itemWidth?: number;
    /**
     * Height of each item in the GridView.
     */
    itemHeight?: number;
    /**
     * Optional initial active index for the GridView.
     */
    initialActiveIndex?: number;
    /**
     * Direction of the GridView, either 'ltr' (left to right) or 'rtl' (right to left).
     */
    direction?: "ltr" | "rtl";
    /**
     * Gap between items in pixels.
     */
    gap?: number;
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
     * @param activeIndex - Current active index (optional)
     * @param prevIndex - Previous index (optional)
     */
    onUp?: (activeIndex?: number, prevIndex?: number) => void;
    /**
     * Callback function for when the down navigation is triggered.
     * @param activeIndex?: Current active index (optional)
     * @param prevIndex?: Previous index (optional)
     */
    onDown?: (activeIndex?: number, prevIndex?: number) => void;
    /**
     * Callback function for when the left navigation is triggered.
     * @param activeIndex?: Current active index (optional)
     * @param prevIndex?: Previous index (optional)
     */
    onLeft?: (activeIndex?: number, prevIndex?: number) => void;
    /**
     * Callback function for when the right navigation is triggered.
     * @param activeIndex?: Current active index (optional)
     * @param prevIndex?: Previous index (optional)
     */
    onRight?: (activeIndex?: number, prevIndex?: number) => void;
    /**
     * Callback function for when the ok navigation is triggered.
     * @param item?: The current item (optional)
     * @param index?: The current index (optional)
     */
    onOk?: (item?: any, index?: number) => void;
    /**
     * Callback function for when the back navigation is triggered.
     * @param activeIndex?: Current active index (optional)
     */
    onBack?: (activeIndex?: number) => void;
    /**
     * Function to render each item in the GridView.
     * @param props - The props for the item.
     * @returns The rendered item.
     */
    renderItem: (props: ItemProps) => React.ReactNode;
}
export interface ItemProps {
    key: string;
    index: number;
    style: React.CSSProperties;
    isActive: boolean;
    item: any;
    onMouseEnter?: () => void;
}
