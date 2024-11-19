import { MouseKeyboardEvent } from '../../types';
import { NavigableComponentProps } from '../../types/base';

export interface InoSidebarItemProps extends NavigableComponentProps {
    /** Item id */
    id: string | number;
    /** Item label/content */
    label: string;
    /** Optional icon component */
    icon?: React.ReactNode;
    /** Whether the item is selected */
    selected?: boolean;
    /** Whether the item is disabled */
    disabled?: boolean;
    /** Called when item is clicked/selected */
    onClick?: (e: MouseKeyboardEvent, index?: number) => void;
}

export interface InoSidebarProps extends NavigableComponentProps {
    /** Sidebar items */
    items: InoSidebarItemProps[];
    /** Selected item id */
    selectedId?: string;
    /** Called when selected item changes */
    onSelect?: (item: InoSidebarItemProps) => void;
    /** Whether to show item indicators */
    showIndicators?: boolean;
    /** Whether to collapse sidebar */
    collapsed?: boolean;
    /** Position of the sidebar */
    position?: 'left' | 'right';
    /** Visual variant */
    variant?: 'primary' | 'secondary';
} 