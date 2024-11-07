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
    scrollOffset = 0,
    rowItemsCount,
    rowCount,
    bufferStart = 0,
    bufferEnd = 0,
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
    gap = 1,
  }) => {
    const scrollViewRef = useRef<HTMLDivElement>(null);
    const [startRow, setStartRow] = useState(0);
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({
      itemWidth: itemWidth || 15,
      itemHeight: itemHeight || 15,
      rowItems: rowItemsCount || 5,
      rows: rowCount || Math.ceil(data.length / (rowItemsCount || 5)),
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
          prev === data.length - 1
        ) {
          requestAnimationFrame(() => onRight?.(prev));
        } else {
          prev++;
        }
        return prev;
      });
    }, [rowItemsCount, data.length, onRight]);

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
          Math.ceil(data.length / rowItemsCount)
        ) {
          requestAnimationFrame(() => onDown?.(prev));
        } else {
          prev += rowItemsCount;
          if (prev > data.length - 1) prev = data.length - 1;
        }
        changeStartRow(prev);
        return prev;
      });
    }, [rowItemsCount, data.length, onDown, changeStartRow]);

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
        const DEFAULT_ROW_ITEMS = 5;
        const DEFAULT_ITEM_WIDTH = 15;
        const DEFAULT_ITEM_HEIGHT = 15;

        // Calculate dimensions based on data length
        const totalItems = data.length;

        // Use provided rowItemsCount or default
        const calculatedRowItems = rowItemsCount || DEFAULT_ROW_ITEMS;

        // Calculate rows based on total items and items per row
        const calculatedRows =
          rowCount || Math.ceil(totalItems / calculatedRowItems);

        // Use provided dimensions or defaults
        const calculatedItemWidth = itemWidth || DEFAULT_ITEM_WIDTH;
        const calculatedItemHeight = itemHeight || DEFAULT_ITEM_HEIGHT;

        setDimensions({
          itemWidth: calculatedItemWidth,
          itemHeight: calculatedItemHeight,
          rowItems: calculatedRowItems,
          rows: calculatedRows,
        });
      };

      calculateDimensions();
    }, [itemWidth, itemHeight, rowItemsCount, rowCount, data.length]);

    // Use calculated dimensions in render logic
    const getItemStyle = useCallback(
      (index: number): React.CSSProperties => {
        const vIndex = Math.floor(index / dimensions.rowItems);
        const hIndex = index % dimensions.rowItems;

        return {
          position: 'absolute',
          width: `${dimensions.itemWidth}rem`,
          height: `${dimensions.itemHeight}rem`,
          top: `${vIndex * (dimensions.itemHeight + gap)}rem`,
          [direction === 'rtl' ? 'right' : 'left']: `${hIndex *
            (dimensions.itemWidth + gap)}rem`,
        };
      },
      [dimensions, gap, direction]
    );

    const renderItems = useCallback(() => {
      const items: React.ReactNode[] = [];

      // Guard against invalid dimensions
      if (!dimensions.rowItems) {
        console.warn('Invalid rowItems in dimensions:', dimensions);
        return items;
      }

      // Calculate visible range
      const visibleStart = Math.max(
        0,
        startRow * dimensions.rowItems - dimensions.rowItems * bufferStart
      );

      const visibleEnd = Math.min(
        data.length,
        startRow * dimensions.rowItems +
          dimensions.rowItems * dimensions.rows +
          dimensions.rowItems * bufferEnd
      );

      for (let i = visibleStart; i < visibleEnd; i++) {
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
      return items;
    }, [
      startRow,
      bufferStart,
      bufferEnd,
      dimensions.rowItems,
      dimensions.rows,
      data.length,
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
