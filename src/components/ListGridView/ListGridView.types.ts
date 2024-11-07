import { ListViewProps } from '../ListView/ListView.types';

export interface CategoryData<T = any> {
    id: number | string;
    title?: string;
    list: T[];
}

export interface ListGridViewProps<T = any> extends Omit<ListViewProps, 'listType'> {
    rowsCount: number;
    rowGap?: number;
    data: CategoryData<T>[];
    selectedCategoryId?: number | string;
    onRowChange?: (row: number) => void;
}