import React, { useCallback, useMemo } from 'react';
import { ListView } from '../ListView/ListView';
import { ListGridViewProps } from './ListGridView.types';

export const ListGridView: React.FC<ListGridViewProps> = ({
  rowsCount,
  rowGap = 1,
  itemsCount,
  itemsTotal,
  onRowChange = () => {},
  onUp = () => {},
  onDown = () => {},
  ...listViewProps
}) => {
  const itemsPerRow = useMemo(() => Math.ceil(itemsTotal / rowsCount), [
    itemsTotal,
    rowsCount,
  ]);

  const handleUp = useCallback(() => {
    const currentRow = Math.floor(
      listViewProps.initialActiveIndex / itemsPerRow
    );
    if (currentRow === 0) {
      onUp();
    }
  }, [itemsPerRow, listViewProps.initialActiveIndex, onUp]);

  const handleDown = useCallback(() => {
    const currentRow = Math.floor(
      listViewProps.initialActiveIndex / itemsPerRow
    );
    if (currentRow === rowsCount - 1) {
      onDown();
    }
  }, [itemsPerRow, listViewProps.initialActiveIndex, rowsCount, onDown]);

  const getItemStyle = useCallback(
    (index: number): React.CSSProperties => {
      const row = Math.floor(index / itemsPerRow);
      const col = index % itemsPerRow;

      return {
        position: 'absolute',
        width: `${listViewProps.itemWidth}rem`,
        height: `${listViewProps.itemHeight}rem`,
        top: `${row * (listViewProps.itemHeight + rowGap)}rem`,
        [listViewProps.direction === 'rtl' ? 'right' : 'left']: `${col *
          (listViewProps.itemWidth + (listViewProps.gap || 0))}rem`,
      };
    },
    [
      itemsPerRow,
      listViewProps.itemWidth,
      listViewProps.itemHeight,
      listViewProps.direction,
      listViewProps.gap,
      rowGap,
    ]
  );

  return (
    <ListView
      {...listViewProps}
      listType="vertical"
      itemsCount={itemsPerRow}
      itemsTotal={itemsTotal}
      onUp={handleUp}
      onDown={handleDown}
      renderItem={props => {
        const row = Math.floor(props.index / itemsPerRow);
        if (
          row !== Math.floor(listViewProps.initialActiveIndex / itemsPerRow)
        ) {
          onRowChange(row);
        }
        return listViewProps.renderItem({
          ...props,
          style: getItemStyle(props.index),
        });
      }}
    />
  );
};
