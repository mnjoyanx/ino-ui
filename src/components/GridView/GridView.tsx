import React, {
  memo,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  startTransition,
} from 'react';
import useKeydown from '../../hooks/useKeydown';
import { GridViewProps, ItemProps } from './GridView.types';

const TRANSFORM_TIMEOUT = 800;

/**
 * Initializes a GridView component with the given properties.
 *
 * @param {GridViewProps} props - The properties for the GridView component.
 * @returns {React.ReactNode} The initialized GridView component.
 */

/**
 * GridView component for displaying a grid of items.
 *
 * This component provides a customizable grid view with optional navigation and item rendering.
 * It supports keyboard navigation and can be controlled via props.
 *
 * @component
 * @example
 * ```jsx
 * <GridView
 *   id="example-grid"
 *   uniqueKey="list-"
 *   nativeControle={true}
 *   rowItemsCount={4}
 *   rowCount={10}
 *   bufferStart={0}
 *   bufferEnd={0}
 *   itemsTotal={40}
 *   itemWidth={20}
 *   itemHeight={20}
 *   isActive={true}
 *   initialActiveIndex={0}
 *   direction="ltr"
 *   onMouseEnter={() => {}}
 *   onChangeRow={() => {}}
 *   onUp={() => {}}
 *   onDown={() => {}}
 *   onBack={() => {}}
 *   renderItem={(item) => <div>{item}</div>}
 *   data={Array(40).fill('Item')}
 * />
 * ```
 */

export const GridView: React.FC<GridViewProps> = memo(
  ({
    id,
    uniqueKey = 'list-',
    nativeControle = false,
    // debounce = 300,
    scrollOffset = 0,
    rowItemsCount,
    rowCount,
    bufferStart = 0,
    bufferEnd = 0,
    itemsTotal,
    itemWidth,
    itemHeight,
    isActive,
    initialActiveIndex = 0,
    direction = 'ltr',
    onMouseEnter = () => {},
    onChangeRow = () => {},
    onUp = () => {},
    onDown = () => {},
    onLeft = () => {},
    onRight = () => {},
    onOk = () => {},
    onBack = () => {},
    renderItem,
    data,
    containerWidth,
    containerHeight,
    gap = 1,
    aspectRatio = 16 / 9,
  }) => {
    const scrollViewRef = useRef<HTMLDivElement>(null);
    const [startRow, setStartRow] = useState(0);
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({
      itemWidth: 0,
      itemHeight: 0,
      rowItems: 0,
      rows: 0,
    });

    const changeStartRow = useCallback(
      (index: number) => {
        let startScrollRow = 2;
        let currentRow = Math.ceil((index + 1) / rowItemsCount);
        let row = currentRow - startScrollRow;
        if (row < 0) row = 0;
        setStartRow(row);
      },
      [rowItemsCount]
    );

    useEffect(() => {
      setActiveIndex(initialActiveIndex);
      changeStartRow(initialActiveIndex);
    }, [id, initialActiveIndex, changeStartRow]);

    const left = useCallback(() => {
      setActiveIndex(prev => {
        if (prev % rowItemsCount === 0) {
          requestAnimationFrame(() => onLeft?.(prev));
        } else {
          prev--;
        }
        return prev;
      });
    }, [rowItemsCount, onLeft]);

    const right = useCallback(() => {
      setActiveIndex(prev => {
        if (
          prev % rowItemsCount === rowItemsCount - 1 ||
          prev === itemsTotal - 1
        ) {
          requestAnimationFrame(() => onRight?.(prev));
        } else {
          prev++;
        }
        return prev;
      });
    }, [rowItemsCount, itemsTotal, onRight]);

    const up = useCallback(() => {
      setActiveIndex(prev => {
        if (prev < rowItemsCount) {
          requestAnimationFrame(() => onUp?.(prev));
        } else {
          prev -= rowItemsCount;
        }
        changeStartRow(prev);
        return prev;
      });
    }, [rowItemsCount, onUp, changeStartRow]);

    const down = useCallback(() => {
      setActiveIndex(prev => {
        if (
          Math.ceil((prev + 1) / rowItemsCount) ===
          Math.ceil(itemsTotal / rowItemsCount)
        ) {
          requestAnimationFrame(() => onDown?.(prev));
        } else {
          prev += rowItemsCount;
          if (prev > itemsTotal - 1) prev = itemsTotal - 1;
        }
        changeStartRow(prev);
        return prev;
      });
    }, [rowItemsCount, itemsTotal, onDown, changeStartRow]);

    const ok = useCallback(() => {
      onOk?.(data[activeIndex], activeIndex);
    }, [onOk, data, activeIndex]);

    const back = useCallback(() => {
      onBack?.(activeIndex);
    }, [onBack, activeIndex]);

    const onMouseEnterItem = useCallback(
      (index: number) => {
        setActiveIndex(index);
        onMouseEnter(index);
      },
      [onMouseEnter]
    );

    // Calculate dimensions based on container and data
    useEffect(() => {
      const calculateDimensions = () => {
        const container = containerRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const availableWidth = containerWidth || containerRect.width;
        const availableHeight = containerHeight || containerRect.height;

        let calculatedRowItems = rowItemsCount;
        let calculatedRows = rowCount;
        let calculatedItemWidth = itemWidth;
        let calculatedItemHeight = itemHeight;

        // If dimensions are not provided, calculate them
        if (!itemWidth || !itemHeight) {
          if (rowItemsCount && rowCount) {
            // Calculate based on provided row counts
            calculatedItemWidth =
              (availableWidth - gap * (rowItemsCount - 1)) / rowItemsCount;
            calculatedItemHeight =
              (availableHeight - gap * (rowCount - 1)) / rowCount;
          } else {
            // Calculate based on container size and aspect ratio
            const totalItems = data.length;
            const containerAspect = availableWidth / availableHeight;

            calculatedRowItems = Math.ceil(
              Math.sqrt((totalItems * containerAspect) / aspectRatio)
            );
            calculatedRows = Math.ceil(totalItems / calculatedRowItems);

            calculatedItemWidth =
              (availableWidth - gap * (calculatedRowItems - 1)) /
              calculatedRowItems;
            calculatedItemHeight = calculatedItemWidth / aspectRatio;
          }
        }

        setDimensions({
          itemWidth: calculatedItemWidth,
          itemHeight: calculatedItemHeight,
          rowItems: calculatedRowItems,
          rows: calculatedRows,
        });
      };

      calculateDimensions();
    }, [
      containerWidth,
      containerHeight,
      rowItemsCount,
      rowCount,
      itemWidth,
      itemHeight,
      gap,
      aspectRatio,
      data.length,
    ]);

    // Use calculated dimensions in render logic
    const getItemStyle = useCallback(
      (index: number): React.CSSProperties => {
        const vIndex = Math.floor(index / dimensions.rowItems);
        const hIndex = index % dimensions.rowItems;

        return {
          position: 'absolute',
          width: `${dimensions.itemWidth}px`,
          height: `${dimensions.itemHeight}px`,
          top: `${vIndex * (dimensions.itemHeight + gap)}px`,
          [direction === 'rtl' ? 'right' : 'left']: `${hIndex *
            (dimensions.itemWidth + gap)}px`,
        };
      },
      [dimensions, gap, direction]
    );

    const renderItems = useCallback(() => {
      const items: React.ReactNode[] = [];
      const start =
        startRow * dimensions.rowItems - dimensions.rowItems * bufferStart;
      const end =
        startRow * dimensions.rowItems +
        dimensions.rowItems * dimensions.rows +
        dimensions.rowItems * bufferEnd;

      for (let i = start; i < end; i++) {
        if (i >= 0 && i < itemsTotal) {
          const itemProps: ItemProps = {
            key: `${uniqueKey}${i}`,
            index: i,
            style: getItemStyle(i),
            isActive: i === activeIndex && isActive,
            item: data[i],
            onMouseEnter: () => onMouseEnterItem(i),
          };
          items.push(renderItem(itemProps));
        }
      }
      return items;
    }, [
      startRow,
      bufferStart,
      bufferEnd,
      dimensions.rowItems,
      dimensions.rows,
      itemsTotal,
      uniqueKey,
      getItemStyle,
      activeIndex,
      isActive,
      data,
      onMouseEnterItem,
      renderItem,
    ]);

    useEffect(() => {
      const applyTransform = () => {
        if (!scrollViewRef.current) return;

        let offset = startRow * dimensions.itemHeight;
        let currentRow = Math.ceil((activeIndex + 1) / dimensions.rowItems);

        if (currentRow > 1) {
          offset += scrollOffset;
        }

        const transform = `translate3d(0, -${offset}rem, 0)`;

        scrollViewRef.current.style.transform = transform;
        scrollViewRef.current.style.webkitTransform = transform;
        //   scrollViewRef.current.style.msTransform = transform;

        window.dispatchEvent(new Event('transformstart'));
        setTimeout(
          () => window.dispatchEvent(new Event('transformend')),
          TRANSFORM_TIMEOUT
        );

        onChangeRow(currentRow);
      };

      startTransition(() => {
        applyTransform();
      });
    }, [
      activeIndex,
      startRow,
      dimensions.itemHeight,
      dimensions.rowItems,
      scrollOffset,
      onChangeRow,
    ]);

    const keyDownOptions = useMemo(
      () => ({
        isActive: isActive && nativeControle,
        //   debounce,
        left,
        right,
        up,
        down,
        back,
        ok,
      }),
      [isActive, nativeControle, left, right, up, down, back, onOk]
    );

    useKeydown(keyDownOptions);

    return (
      <div
        ref={containerRef}
        className="scroll-view-parent"
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <div className="scroll-view grid-view" ref={scrollViewRef}>
          {renderItems()}
        </div>
      </div>
    );
  }
);
