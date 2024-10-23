import React from "react";

export interface GridViewProps {
    id: string;
    uniqueKey?: string;
    nativeControle?: boolean;
    debounce?: number;
    scrollOffset?: number;
    rowItemsCount: number;
    rowCount: number;
    bufferStart?: number;
    bufferEnd?: number;
    itemsTotal: number;
    itemWidth: number;
    itemHeight: number;
    isActive: boolean;
    initialActiveIndex?: number;
    direction?: "ltr" | "rtl";
    onMouseEnter?: (index: number) => void;
    onChangeRow: (row: number) => void;
    onUp: () => void;
    onDown: () => void;
    onLeft: () => void;
    onRight: () => void;
    onBack: () => void;
    renderItem: (props: ItemProps) => React.ReactNode;
    data: any[];
}

export interface ItemProps {
    key: string;
    index: number;
    style: React.CSSProperties;
    isActive: boolean;
    item: any;
    onMouseEnter: () => void;
}
