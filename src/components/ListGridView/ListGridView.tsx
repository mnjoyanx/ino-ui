import React, { useCallback, useMemo, useState } from 'react';
import { ListView } from '../ListView/ListView';
import { CategoryData, ListGridViewProps } from './ListGridView.types';
import { ItemProps } from '../ListView/ListView.types';
// import useKeydown from '../../hooks/useKeydown';
// import useKeydown from '../../hooks/useKeydown';

export const ListGridView: React.FC<ListGridViewProps> = ({
  rowsCount,
  rowGap = 1,
  data,
  withTitle = false,
  isActive,
  onRowChange = () => {},
  ...listViewProps
}) => {
  //   const [activeIndex, setActiveIndex] = useState(
  //     listViewProps.initialActiveIndex || 0
  //   );

  const [activeIndex, setActiveIndex] = useState(0);
  const currentList = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const itemsTotal = currentList.length;
  const itemsPerRow = useMemo(() => Math.ceil(itemsTotal / rowsCount), [
    itemsTotal,
    rowsCount,
  ]);

  //   useEffect(() => {
  //     setActiveIndex(listViewProps.initialActiveIndex || 0);
  //   }, [listViewProps.initialActiveIndex]);

  //   useKeydown({
  //     isActive: true,
  //     onUp: () => {
  //       console.log('up');
  //       setActiveIndex(prev => Math.max(0, prev - itemsPerRow));
  //     },
  //     onDown: () => {
  //       alert('dodododoo');
  //       setActiveIndex(prev => Math.min(itemsTotal - 1, prev + itemsPerRow));
  //     },
  //   });

  //   const handleUp = useCallback(() => {
  //     setActiveIndex(prev => {
  //       const currentRow = Math.floor(prev / itemsPerRow);
  //       if (currentRow === 0) {
  //         onUp();
  //         return prev;
  //       }
  //       return Math.max(0, prev - itemsPerRow);
  //     });
  //   }, [itemsPerRow, onUp]);

  //   const handleDown = useCallback(() => {
  //     setActiveIndex(prev => {
  //       const currentRow = Math.floor(prev / itemsPerRow);
  //       if (currentRow === rowsCount - 1) {
  //         onDown();
  //         return prev;
  //       }
  //       return Math.min(itemsTotal - 1, prev + itemsPerRow);
  //     });
  //   }, [itemsPerRow, rowsCount, itemsTotal, onDown]);

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

  const renderRowItems = useCallback(
    ({ item, index, isActive }: ItemProps & { item: CategoryData }) => {
      console.log({ ...listViewProps }, 'list view props');
      return (
        <div key={index}>
          {withTitle ? <h3>{item.name}</h3> : null}
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
            isActive={isActive && index === activeIndex}
            renderItem={listViewProps.renderItem}
            // nativeControle={true}
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
    ]
  );

  //   useKeydown({
  //     isActive,
  //     onUp: () => {
  //       console.log(activeIndex, 'active index');
  //       setActiveIndex(prev => {
  //         const currentRow = Math.floor(prev / itemsPerRow);
  //         if (currentRow === 0) {
  //           //   onUp();
  //           console.log('up todo pass the callback when the active index is 0');
  //           return prev;
  //         }
  //         return Math.max(0, prev - itemsPerRow);
  //       });
  //     },
  //     onDown: () => {
  //       console.log(activeIndex, 'active index');
  //       setActiveIndex(prev => {
  //         const currentRow = Math.floor(prev / itemsPerRow);
  //         if (currentRow === rowsCount - 1) {
  //           //   onDown();
  //           console.log(
  //             'down todo pass the callback when the active index is the last row'
  //           );
  //           return prev;
  //         }
  //         return Math.min(itemsTotal - 1, prev + itemsPerRow);
  //       });
  //     },
  //   });

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
      renderItem={({ index, item, style }) => {
        const row = Math.floor(index / itemsPerRow);
        if (row !== Math.floor(activeIndex / itemsPerRow)) {
          onRowChange(row);
        }
        return renderRowItems({
          //   ...listViewProps,
          key: index,
          index,
          item,
          style,
          isActive: isActive,
          onMouseEnter: () => onRowChange(row),
        });
      }}
    />
  );
};
