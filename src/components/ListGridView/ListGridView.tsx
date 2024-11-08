import React, { useCallback, useMemo, useState } from 'react';
import { ListView } from '../ListView/ListView';
import { CategoryData, ListGridViewProps } from './ListGridView.types';
import { ItemProps } from '../ListView/ListView.types';
import useKeydown from '../../hooks/useKeydown';

export const ListGridView: React.FC<ListGridViewProps> = ({
  rowsCount,
  rowGap = 1,
  data,
  withTitle = false,
  isActive,
  onRowChange = () => {},
  onUp = () => {},
  onDown = () => {},
  ...listViewProps
}) => {
  const [activeIndex] = useState(0);
  const currentList = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const itemsTotal = currentList.length;
  const itemsPerRow = useMemo(() => Math.ceil(itemsTotal / rowsCount), [
    itemsTotal,
    rowsCount,
  ]);
  const [currentRow, setCurrentRow] = useState(0);

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

  useKeydown({
    isActive,
    down: () => {
      if (!currentList?.length) return;

      setCurrentRow(prev => Math.min(prev + 1, rowsCount - 1));
    },
    up: () => {
      if (currentRow > 0) {
        setCurrentRow(prev => prev - 1);
      }
    },
  });

  const getRowStyle = useCallback(
    (index: number): React.CSSProperties => {
      return {
        position: 'absolute',
        width: `${listViewProps.itemWidth * itemsPerRow}rem`,
        height: `${listViewProps.itemHeight * rowsCount}rem`,
        top: `${index * (listViewProps.itemHeight + rowGap)}rem`,
      };
    },
    [
      listViewProps.itemWidth,
      listViewProps.itemHeight,
      listViewProps.direction,
      listViewProps.gap,
      itemsPerRow,
      rowsCount,
      rowGap,
    ]
  );

  const renderRowItems = useCallback(
    ({ item, index, isActive }: ItemProps & { item: CategoryData }) => {
      return (
        <div key={index} style={getRowStyle(index)}>
          {withTitle ? <h3 className="ino-list-title">{item.name}</h3> : null}
          <ListView
            {...listViewProps}
            data={item.list}
            id={`${index}-list-view`}
            uniqueKey={`${index}-list-view`}
            listType="horizontal"
            itemsTotal={item.list.length}
            itemsCount={item.list.length}
            buffer={3}
            itemWidth={20}
            itemHeight={30}
            gap={withTitle ? listViewProps.gap + 2 : listViewProps.gap}
            rowGap={rowGap}
            isActive={isActive && currentRow === index}
            renderItem={listViewProps.renderItem}
            nativeControle={true}
          />
        </div>
      );
    },
    [
      itemsPerRow,
      getItemStyle,
      listViewProps.renderItem,
      withTitle,
      activeIndex,
      currentRow,
    ]
  );

  return (
    <ListView
      id={`${activeIndex}-list-grid-view`}
      uniqueKey={`${activeIndex}-list-grid-view`}
      itemWidth={20}
      itemHeight={30}
      data={currentList}
      listType="vertical"
      itemsCount={itemsPerRow}
      itemsTotal={itemsTotal}
      nativeControle={true}
      isActive={isActive}
      buffer={currentList.length}
      gap={listViewProps.gap}
      rowGap={rowGap}
      renderItem={({ index, item, style }) => {
        return renderRowItems({
          key: index,
          index,
          item,
          style,
          isActive: isActive,
          onMouseEnter: () => {
            const row = Math.floor(index / itemsPerRow);
            setCurrentRow(row);
            onRowChange(row);
          },
        });
      }}
    />
  );
};
