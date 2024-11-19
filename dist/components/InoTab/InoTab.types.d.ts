/// <reference types="react" />
import { MouseKeyboardEvent } from "../../types";
import { NavigableComponentProps } from '../../types/base';
export interface InoTabProps extends NavigableComponentProps {
    /** Label text for the tab */
    label: string;
    /** Content of the tab panel */
    children?: React.ReactNode;
    /** Whether the tab is currently selected */
    isSelected?: boolean;
    /** Whether the tab is disabled */
    disabled?: boolean;
    /** Visual variant of the tab */
    variant?: 'primary' | 'secondary';
    /** Size variant of the tab */
    size?: 'small' | 'medium' | 'large';
    /** Called when tab is clicked */
    onClick?: (e: MouseKeyboardEvent, index?: number) => void;
}
export interface InoTabsProps extends NavigableComponentProps {
    /** Tab components */
    children: React.ReactElement<InoTabProps> | React.ReactElement<InoTabProps>[];
    /** Index of the currently selected tab */
    selectedIndex?: number;
    /** Index of the currently active (focused) tab */
    activeIndex?: number;
    /** Whether to change tab only on OK press */
    changeByOnOk?: boolean;
    /** Called when selected tab changes */
    onChange?: (index: number) => void;
    /** Layout direction */
    direction?: 'horizontal' | 'vertical';
    /** Called when active tab changes */
    onActiveChange?: (index: number) => void;
    /** Visual variant applied to all tabs */
    variant?: 'primary' | 'secondary';
    /** Size variant applied to all tabs */
    size?: 'small' | 'medium' | 'large';
}
