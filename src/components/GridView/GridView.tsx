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
  }) => {
    const scrollViewRef = useRef<HTMLDivElement>(null);
    const [startRow, setStartRow] = useState(0);
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

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
          if (onLeft) {
            requestAnimationFrame(onLeft);
          }
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
          if (onRight) {
            requestAnimationFrame(onRight);
          }
        } else {
          prev++;
        }
        return prev;
      });
    }, [rowItemsCount, itemsTotal, onRight]);

    const up = useCallback(() => {
      setActiveIndex(prev => {
        if (prev < rowItemsCount) {
          requestAnimationFrame(onUp);
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
          requestAnimationFrame(() => onDown(activeIndex, prev));
        } else {
          prev += rowItemsCount;
          if (prev > itemsTotal - 1) prev = itemsTotal - 1;
        }
        changeStartRow(prev);
        return prev;
      });
    }, [rowItemsCount, itemsTotal, onDown, changeStartRow]);

    const ok = useCallback(() => {
      onOk();
    }, [onOk]);

    const back = useCallback(() => {
      onBack();
    }, [onBack]);

    const onMouseEnterItem = useCallback(
      (index: number) => {
        console.log(index, 'on mouse enter');
        setActiveIndex(index);
        onMouseEnter(index);
      },
      [onMouseEnter]
    );

    const getItemStyle = useCallback(
      (index: number): React.CSSProperties => {
        const vIndex = Math.floor(index / rowItemsCount);
        const hIndex = index % rowItemsCount;

        return {
          position: 'absolute',
          width: `${itemWidth}rem`,
          height: `${itemHeight}rem`,
          top: `${vIndex * itemHeight}rem`,
          [direction === 'rtl' ? 'right' : 'left']: `${hIndex * itemWidth}rem`,
        };
      },
      [rowItemsCount, itemWidth, itemHeight, direction]
    );

    const renderItems = useCallback(() => {
      const items: React.ReactNode[] = [];
      const start = startRow * rowItemsCount - rowItemsCount * bufferStart;
      const end =
        startRow * rowItemsCount +
        rowItemsCount * rowCount +
        rowItemsCount * bufferEnd;

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
      rowItemsCount,
      rowCount,
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

        let offset = startRow * itemHeight;
        let currentRow = Math.ceil((activeIndex + 1) / rowItemsCount);

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
      itemHeight,
      rowItemsCount,
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
        className="scroll-view-parent"
        style={{ width: '100%', height: '100%' }}
      >
        <div className="scroll-view grid-view" ref={scrollViewRef}>
          {renderItems()}
        </div>
      </div>
    );
  }
);
