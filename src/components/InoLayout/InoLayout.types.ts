import { ReactNode } from 'react';
import { NavigableComponentProps } from '../../types/base';

export interface InoRowProps extends NavigableComponentProps {
    children: ReactNode;
    onActiveChange?: (index: number) => void;
}

export interface InoColProps extends NavigableComponentProps {
    children: ReactNode;
    onActiveChange?: (index: number) => void;
}

export interface InoElementWrapperProps {
    children: ReactNode;
    isActive?: boolean;
    index?: number;
    classNames?: string;
}