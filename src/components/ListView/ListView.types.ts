import React from "react";

export interface ListViewProps {
    id: string;
    uniqueKey?: string;
    listType?: "horizontal" | "vertical";
    nativeControle?: boolean;
    debounce?: number;
    itemsCount: number;
    itemsTotal: number;
    buffer: number;
    itemWidth: number;
    itemHeight: number;
    isActive: boolean;
    initialActiveIndex?: number;
    onBackScrollIndex?: number | null;
    startScrollIndex?: number;
    direction?: "ltr" | "rtl";
    onMouseEnter?: (index: number) => void;
    onUp?: () => void;
    onDown?: () => void;
    onLeft?: () => void;
    onRight?: () => void;
    onBack?: () => void;
    renderItem: (props: ItemProps) => React.ReactNode;
    data: any[];
}

export interface ItemProps {
    key: string;
    index: number;
    style: React.CSSProperties;
    isActive: boolean;
    item: any;
    onUp: () => void;
    onDown: () => void;
    onLeft: () => void;
    onRight: () => void;
    onMouseEnter: () => void;
}
