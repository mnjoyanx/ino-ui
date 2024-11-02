import React, {
  memo,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import useKeydown from '../../hooks/useKeydown';
import { ListViewProps, ItemProps } from './ListView.types';

let TRANSFORM_TIMEOUT = null;

/**
 * ListView component for displaying a list of items.
 *
 * This component provides a customizable list view with optional navigation and item rendering.
 * It supports keyboard navigation and can be controlled via props.
 */

/**
 * ListView component for displaying a list of items.
 *
 * This component provides a customizable list view with optional navigation and item rendering.
 * It supports keyboard navigation and can be controlled via props.
 *
 * @component
 * @example
 * ```jsx
 * <ListView
 *   id="example-list"
 *   uniqueKey="list-"
 *   listType="horizontal"
 *   nativeControle={true}
 *   itemsCount={10}
 *   itemsTotal={50}
 *   buffer={2}
 *   itemWidth={20}
 *   itemWidth={20}
 *   itemHeight={20}
 *   isActive={true}
 *   initialActiveIndex={0}
 *   onBackScrollIndex={null}
 *   startScrollIndex={0}
 *   gap={0}
 *   direction="ltr"
 *   onMouseEnter={() => {}}
 *   onUp={() => {}}
 *   onDown={() => {}}
 *   onLeft={() => {}}
 *   onRight={() => {}}
 *   onBack={() => {}}
 *   renderItem={(item) => <div>{item}</div>}
 *   data={Array(50).fill('Item')}
 * />
 * ```
 */

export const ListView: React.FC<ListViewProps> = memo(
  ({
    id,
    uniqueKey = 'list-',
    listType = 'horizontal',
    nativeControle = false,
    itemsCount,
    itemsTotal,
    buffer,
    itemWidth,
    itemHeight,
    gap,
    loop = false,
    isActive,
    initialActiveIndex = 0,
    onBackScrollIndex = null,
    startScrollIndex = 0,
    direction = 'ltr',
    debounce = 200,
    onMouseEnter = () => {},
    onUp = () => {},
    onDown = () => {},
    onLeft = () => {},
    onRight = () => {},
    onBack = () => {},
    renderItem,
    data,
  }) => {
    const scrollViewRef = useRef<HTMLDivElement>(null);
    const [startIndex, setStartIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
    const [virtualData, setVirtualData] = useState(() =>
      Array.from(
        { length: itemsTotal },
        (_, index) => data[index % data.length]
      )
    );
    const [virtualStartIndex, setVirtualStartIndex] = useState(0);

    const changeStartIndex = useCallback(
      (index: number) => {
        index -= startScrollIndex;
        if (index > itemsTotal - itemsCount) index = itemsTotal - itemsCount;
        if (index < 0) index = 0;
        setStartIndex(index);
      },
      [itemsTotal, itemsCount, startScrollIndex]
    );

    useEffect(() => {
      setInitialActiveIndex(initialActiveIndex);
    }, [id]);

    const setInitialActiveIndex = (index: number) => {
      setActiveIndex(index);
      changeStartIndex(index);
    };

    const scrollToIndex = useCallback(
      (index: number) => {
        setActiveIndex(index);
        changeStartIndex(index);

        setTimeout(() => {
          setStartIndex(prevStartIndex => prevStartIndex);
        }, 0);
      },
      [changeStartIndex]
    );

    const next = (count = 1) => {
      setActiveIndex(index => {
        if (index === itemsTotal - 1) {
          if (loop) {
            rotateData('next');
            return index;
          } else {
            listType === 'horizontal'
              ? requestAnimationFrame(onRight)
              : requestAnimationFrame(onDown);
          }
        } else {
          index += count;
          if (index > itemsTotal - 1) {
            index = loop ? index % itemsTotal : itemsTotal - 1;
          }
        }

        changeStartIndex(index);
        return index;
      });
    };

    const prev = (count = 1) => {
      setActiveIndex(index => {
        if (index === 0) {
          if (loop) {
            rotateData('prev');
            return index;
          } else {
            listType === 'horizontal'
              ? requestAnimationFrame(onLeft)
              : requestAnimationFrame(onUp);
          }
        } else {
          index -= count;
          if (index < 0) {
            index = loop ? 0 : 0;
          }
        }

        changeStartIndex(index);
        return index;
      });
    };

    const back = useCallback(() => {
      if (onBackScrollIndex !== null) {
        scrollToIndex(onBackScrollIndex);
      } else {
        scrollToIndex(0); // Scroll to the first element
      }
      requestAnimationFrame(onBack);
    }, [onBackScrollIndex, scrollToIndex, onBack]);

    const onMouseEnterItem = useCallback(
      (index: number) => {
        setActiveIndex(index);
        onMouseEnter(index);
      },
      [onMouseEnter]
    );

    const getItemStyle = useCallback(
      (index: number): React.CSSProperties => {
        return {
          position: 'absolute',
          width: `${itemWidth}rem`,
          height: `${itemHeight}rem`,
          ...(listType === 'horizontal'
            ? {
                [direction === 'rtl' ? 'right' : 'left']: `${index *
                  (itemWidth + (gap || 0))}rem`,
                top: 0,
              }
            : {
                left: 0,
                top: `${index * (itemHeight + (gap || 0))}rem`,
              }),
        };
      },
      [itemWidth, itemHeight, listType, direction, gap]
    );

    const renderItems = useCallback(() => {
      const items: React.ReactNode[] = [];
      const start = Math.max(0, startIndex - buffer);
      const end = Math.min(itemsTotal, startIndex + itemsCount + buffer);

      for (let i = start; i < end; i++) {
        const virtualIndex = i % virtualData.length;
        const itemProps: ItemProps = {
          key: `${uniqueKey}${i}`,
          index: i,
          style: getItemStyle(i - virtualStartIndex),
          isActive: i === activeIndex && isActive,
          item: virtualData[virtualIndex],
          onUp,
          onDown,
          onLeft,
          onRight,
          onMouseEnter: () => onMouseEnterItem(i),
        };
        items.push(renderItem(itemProps));
      }
      return items;
    }, [
      startIndex,
      buffer,
      itemsCount,
      itemsTotal,
      uniqueKey,
      getItemStyle,
      activeIndex,
      isActive,
      onUp,
      onDown,
      onLeft,
      onRight,
      onMouseEnterItem,
      renderItem,
      virtualData,
      virtualStartIndex,
    ]);

    useEffect(() => {
      const applyTransform = () => {
        if (!scrollViewRef.current) return;

        (window as any).transforming = true;
        window.dispatchEvent(new Event('transformstart'));
        clearTimeout(TRANSFORM_TIMEOUT);

        TRANSFORM_TIMEOUT = setTimeout(
          () => window.dispatchEvent(new Event('transformend')),
          500
        );

        const transform =
          listType === 'horizontal'
            ? `translate3d(${direction === 'ltr' ? '-' : ''}${startIndex *
                (itemWidth + (gap || 0))}rem, 0, 0)`
            : `translate3d(0, -${startIndex *
                (itemHeight + (gap || 0))}rem, 0)`;

        scrollViewRef.current.style.transform = transform;
        scrollViewRef.current.style.webkitTransform = transform;
      };

      applyTransform();
    }, [startIndex, listType, direction, itemWidth, itemHeight]);

    const keyDownOptions = useMemo(
      () => ({
        isActive: isActive && nativeControle,
        debounce,
        left: () => listType === 'horizontal' && prev(),
        right: () => listType === 'horizontal' && next(),
        up: () => listType !== 'horizontal' && prev(),
        down: () => listType !== 'horizontal' && next(),
        channel_up: () => prev(itemsCount),
        channel_down: () => next(itemsCount),
        back,
      }),
      [
        isActive,
        nativeControle,
        listType,
        prev,
        next,
        itemsCount,
        back,
        debounce,
      ]
    );

    useKeydown(keyDownOptions);

    const parentStyle = useMemo(
      () => ({
        [listType === 'horizontal' ? 'height' : 'width']: `${
          listType === 'horizontal' ? itemHeight : itemWidth
        }rem`,
      }),
      [listType, itemHeight, itemWidth]
    );

    const rotateData = useCallback(
      (direction: 'next' | 'prev') => {
        if (!loop) return;

        setVirtualData(prevData => {
          const newData = [...prevData];
          if (direction === 'next') {
            const item = newData.shift();
            if (item !== undefined) {
              newData.push(item);
            }
          } else {
            const item = newData.pop();
            if (item !== undefined) {
              newData.unshift(item);
            }
          }
          return newData;
        });

        // Adjust virtual start index to maintain visual position
        setVirtualStartIndex(prev => {
          if (direction === 'next') {
            return prev > 0 ? prev - 1 : 0;
          } else {
            return prev + 1;
          }
        });
      },
      [loop]
    );

    useEffect(() => {
      setVirtualData(
        Array.from(
          { length: itemsTotal },
          (_, index) => data[index % data.length]
        )
      );
    }, [data, itemsTotal]);

    return (
      <div className={`scroll-view-parent ${listType}`} style={parentStyle}>
        <div
          className={`scroll-view list-view ${
            direction === 'rtl' ? 'rtl-list-view' : ''
          }`}
          ref={scrollViewRef}
        >
          {renderItems()}
        </div>
      </div>
    );
  }
);
