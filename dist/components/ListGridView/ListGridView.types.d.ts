import { ListViewProps } from '../ListView/ListView.types';
export interface ListGridViewProps extends Omit<ListViewProps, 'listType'> {
    /**
     * Number of rows to display in the grid
     */
    rowsCount: number;
    /**
     * Gap between rows in rem units
     */
    rowGap?: number;
    /**
     * Callback function when row changes
     * @param row - The current row number
     */
    onRowChange?: (row: number) => void;
}
