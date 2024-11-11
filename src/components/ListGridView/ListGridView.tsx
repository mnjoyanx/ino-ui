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
        height: `${listViewProps.itemHeight}rem`,
        top: `${index * (listViewProps.itemHeight + rowGap)}rem`,
      };
    },
    [listViewProps.itemWidth, listViewProps.itemHeight, itemsPerRow, rowGap]
  );

  const renderRowItems = useCallback(
    ({ item, index, isActive }: ItemProps & { item: CategoryData }) => {
      return (
        <div key={index} style={getRowStyle(index)}>
          {withTitle ? (
            <div className="ino-list-title-wrapper">
              <h3 className="ino-list-title">{item.name}</h3>
            </div>
          ) : null}
          <ListView
            {...listViewProps}
            data={item.list}
            id={`${index}-list-view`}
            uniqueKey={`${index}-list-view`}
            listType="horizontal"
            itemsTotal={item.list.length}
            itemsCount={listViewProps.itemsCount || 1}
            buffer={listViewProps.buffer || 3}
            debounce={listViewProps.debounce || 200}
            itemWidth={listViewProps.itemWidth || 20}
            itemHeight={listViewProps.itemHeight || 30}
            gap={listViewProps.gap || 0}
            rowGap={rowGap || 0}
            withTitle={withTitle}
            isActive={isActive && currentRow === index}
            renderItem={listViewProps.renderItem}
            nativeControle={true}
          />
        </div>
      );
    },
    [getRowStyle, listViewProps.renderItem, withTitle, activeIndex, currentRow]
  );

  return (
    <ListView
      id={`${activeIndex}-list-grid-view`}
      uniqueKey={`${activeIndex}-list-grid-view`}
      itemWidth={listViewProps.itemWidth}
      itemHeight={listViewProps.itemHeight}
      data={currentList}
      listType="vertical"
      itemsCount={itemsPerRow}
      itemsTotal={itemsTotal}
      nativeControle={true}
      isActive={isActive}
      debounce={listViewProps.debounce || 200}
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
