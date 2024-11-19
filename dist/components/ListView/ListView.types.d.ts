import React from "react";
import { BaseProps, NavigableComponentProps } from '../../types/base';
/**
 * Interface for ListView component props.
 */
export interface ListViewProps extends NavigableComponentProps {
    /** Unique identifier for the list */
    id: string | number;
    /** Items to be rendered in the list */
    items: any[];
    /** Unique identifier for the list item */
    uniqueKey: string | number;
    /** Function to render each item */
    renderItem: (props: ItemProps) => React.ReactNode;
    /** Number of items to render at once */
    itemsPerPage?: number;
    /** Total number of items */
    itemsTotal?: number;
    /** Number of items to render */
    itemsCount?: number;
    /** Buffer size */
    buffer?: number;
    /** Height of each item */
    itemHeight?: number;
    /** Width of each item */
    itemWidth?: number;
    /** Layout orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Initial active index */
    initialActiveIndex?: number;
    /** Gap between items */
    gap?: number;
    /** Gap between rows */
    rowGap?: number;
    /** Whether the list has a title */
    withTitle?: boolean;
    /** Index to scroll back to when back is pressed */
    onBackScrollIndex?: number | null;
    /** Starting scroll index */
    startScrollIndex?: number;
    /** Layout direction */
    direction?: 'ltr' | 'rtl';
    /** List type */
    listType?: 'horizontal' | 'vertical';
    /** Arrows configuration */
    arrows?: ArrowProps;
    /** Edge scroll configuration */
    edgeScroll?: EdgeScrollProps;
    /** Debounce time for item selection */
    debounce?: number;
    /** Whether the list is controlled by native elements */
    nativeControle?: boolean;
    /** Called when an item is selected */
    onOk?: (item: any, index: number) => void;
}
export interface ItemProps extends NavigableComponentProps {
    /** Unique identifier for the item */
    key: string | number;
    /** Item index */
    index: number;
    /** Item styles */
    style: React.CSSProperties;
    /** Whether the item is currently active */
    isActive: boolean;
    /** The item data */
    item: any;
}
export interface ArrowProps extends BaseProps {
    /** Whether to show the arrows */
    show?: boolean;
    /** Icon for the start arrow */
    startIcon?: React.ReactNode;
    /** Icon for the end arrow */
    endIcon?: React.ReactNode;
}
export interface NavigationArrowProps extends BaseProps {
    /** Arrow direction */
    direction: 'start' | 'end';
    /** Arrow icon */
    icon: React.ReactNode;
    /** Click handler */
    onClick: (e: React.MouseEvent) => void;
    /** Whether to show the arrow */
    show: boolean;
    /** List orientation */
    listType: 'horizontal' | 'vertical';
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
