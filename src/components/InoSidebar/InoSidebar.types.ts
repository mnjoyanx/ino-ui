import { MouseKeyboardEvent } from '../../types';

export type InoSidebarPosition = 'left' | 'right';

export interface InoSidebarItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export interface InoSidebarProps {
    /** Array of sidebar items */
    items: InoSidebarItem[];
    /** Currently selected item ID */
    selectedId?: string;
    /** Whether the sidebar is in a loading state */
    /** Whether the sidebar is collapsed */
    collapsed?: boolean;
    /** Whether the sidebar is active (for navigation) */
    isActive?: boolean;
    /** Custom class names */
    className?: string;
    /** Position of the sidebar */
    position?: InoSidebarPosition;
    /** Whether to use RTL layout */
    rtl?: boolean;
    /** Z-index for the sidebar */
    zIndex?: number;
    /** Width of the sidebar in rem units */
    width?: number;
    /** Width of the sidebar when collapsed in rem units */
    collapsedWidth?: number;
    /** Called when an item is selected */
    onSelect?: (item: InoSidebarItem) => void;
    /** Called when navigation events occur */
    onUp?: (e: MouseKeyboardEvent, index?: number) => void;
    onDown?: (e: MouseKeyboardEvent, index?: number) => void;
    onRight?: (e: MouseKeyboardEvent, index?: number) => void;
    onLeft?: (e: MouseKeyboardEvent, index?: number) => void;
} 