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
import { NavigationArrow } from './NavigationArrow';
import SvgArrowLeft from '../Svgs/SvgArrowLeft';
import SvgArrowRight from '../Svgs/SvgArrowRight';
import SvgArrowUp from '../Svgs/SvgArrowUp';
import SvgArrowDown from '../Svgs/SvgArrowDown';

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
 *   gap={1}
 *   buffer={2}
 *   itemWidth={20}
 *   itemWidth={20}
 *   itemHeight={20}
 *   isActive={true}
 *   initialActiveIndex={0}
 *   onBackScrollIndex={null}
 *   startScrollIndex={0}
 *   direction="ltr"
 *   onMouseEnter={() => {}}
 *   onUp={() => {}}
 *   onDown={() => {}}
 *   onLeft={() => {}}
 *   onRight={() => {}}
 *   onBack={() => {}}
 *   renderItem={(item) => <div>{item}</div>}
 *   items={Array(50).fill('Item')}
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
    isActive,
    initialActiveIndex = 0,
    onBackScrollIndex = null,
    startScrollIndex = 0,
    direction = 'ltr',
    withTitle = false,
    rowGap = 0,
    debounce = 200,
    onMouseEnter = () => {},
    onUp = () => {},
    onDown = () => {},
    onLeft = () => {},
    onRight = () => {},
    onBack = () => {},
    renderItem,
    items,
    arrows = {
      show: false,
      startIcon: '←',
      endIcon: '→',
      style: {},
      classNames: '',
    },
    edgeScroll = {
      enabled: false,
      interval: 700,
      startDelay: 1000,
    },
    onOk = () => {},
  }) => {
    const scrollViewRef = useRef<HTMLDivElement>(null);
    const [startIndex, setStartIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
    const [showStartArrow, setShowStartArrow] = useState(false);
    const [showEndArrow, setShowEndArrow] = useState(false);
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);
    const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

        // Trigger a re-render to update the transform
        setTimeout(() => {
          setStartIndex(prevStartIndex => prevStartIndex);
        }, 0);
      },
      [changeStartIndex]
    );

    const next = (e: KeyboardEvent | React.MouseEvent, count = 1) => {
      setActiveIndex(index => {
        if (index === itemsTotal - 1) {
          listType === 'horizontal'
            ? requestAnimationFrame(() => onRight(e as KeyboardEvent, count))
            : requestAnimationFrame(() => onDown(e as KeyboardEvent, count));
        } else {
          index += count;
          if (index > itemsTotal - 1) index = itemsTotal - 1;
        }

        changeStartIndex(index);

        return index;
      });
    };

    const prev = (e: KeyboardEvent | React.MouseEvent, count = 1) => {
      setActiveIndex(index => {
        if (index === 0) {
          listType === 'horizontal'
            ? requestAnimationFrame(() => onLeft(e as KeyboardEvent, count))
            : requestAnimationFrame(() => onUp(e as KeyboardEvent, count));
        } else {
          index -= count;
          if (index < 0) index = 0;
        }

        changeStartIndex(index);

        return index;
      });
    };

    const back = useCallback(
      (e: KeyboardEvent) => {
        if (onBackScrollIndex !== null) {
          scrollToIndex(onBackScrollIndex);
        } else {
          scrollToIndex(0); // Scroll to the first element
        }
        requestAnimationFrame(() => onBack(e));
      },
      [onBackScrollIndex, scrollToIndex, onBack]
    );

    const onMouseEnterItem = useCallback(
      (e: React.MouseEvent, index: number) => {
        setActiveIndex(index);
        onMouseEnter(e, index);
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
      const start = startIndex - buffer;
      const end = startIndex + itemsCount + buffer;

      for (let i = start; i < end; i++) {
        if (i >= 0 && i < itemsTotal) {
          const itemProps: ItemProps = {
            key: `${uniqueKey}${i}`,
            index: i,
            style: getItemStyle(i),
            isActive: i === activeIndex && isActive,
            item: items[i],
            onUp,
            onDown,
            onLeft,
            onRight,
            onMouseEnter: (e: React.MouseEvent) => onMouseEnterItem(e, i),
          };
          items.push(renderItem(itemProps));
        }
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
      items,
    ]);

    useEffect(() => {
      const applyTransform = () => {
        if (!scrollViewRef.current) return;

        const verticalSpacing = itemHeight + rowGap;

        const transform =
          listType === 'horizontal'
            ? `translate3d(${direction === 'ltr' ? '-' : ''}${startIndex *
                (itemWidth + (gap || 0))}rem, 0, 0)`
            : `translate3d(0, -${startIndex * verticalSpacing}rem, 0)`;

        scrollViewRef.current.style.transform = transform;
        scrollViewRef.current.style.webkitTransform = transform;

        window.dispatchEvent(new Event('transformstart'));
        clearTimeout(TRANSFORM_TIMEOUT);
        TRANSFORM_TIMEOUT = setTimeout(
          () => window.dispatchEvent(new Event('transformend')),
          500
        );
      };

      applyTransform();
    }, [
      startIndex,
      listType,
      direction,
      itemWidth,
      itemHeight,
      gap,
      withTitle,
    ]);

    useEffect(() => {
      if (arrows.show) {
        setShowStartArrow(startIndex > 0);
        setShowEndArrow(startIndex < itemsTotal - itemsCount);
      }
    }, [startIndex, itemsTotal, itemsCount, arrows.show]);

    // const handleOk = useCallback(() => {
    //   onOk(items[activeIndex], activeIndex);
    // }, [onOk, items, activeIndex]);
    const handleOk = () => {
      onOk(items[activeIndex], activeIndex);
    };

    const keyDownOptions = useMemo(
      () => ({
        isActive: isActive && nativeControle,
        left: (e: KeyboardEvent) =>
          listType === 'horizontal' && prev(e, itemsCount),
        right: (e: KeyboardEvent) =>
          listType === 'horizontal' && next(e, itemsCount),
        up: (e: KeyboardEvent) =>
          listType !== 'horizontal' && prev(e, itemsCount),
        down: (e: KeyboardEvent) =>
          listType !== 'horizontal' && next(e, itemsCount),
        channel_up: (e: KeyboardEvent) => prev(e, itemsCount),
        channel_down: (e: KeyboardEvent) => next(e, itemsCount),
        back: (e: KeyboardEvent) => back(e),
        ok: handleOk,
        debounce,
      }),
      [
        isActive,
        nativeControle,
        listType,
        prev,
        next,
        itemsCount,
        back,
        handleOk,
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

    useEffect(() => {
      return () => {
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current);
        }
        if (autoScrollTimeoutRef.current) {
          clearTimeout(autoScrollTimeoutRef.current);
        }
      };
    }, []);

    const startAutoScroll = useCallback(
      (direction: 'prev' | 'next', e: React.MouseEvent) => {
        if (isAutoScrolling) return;

        setIsAutoScrolling(true);
        const scrollFn = direction === 'prev' ? prev : next;

        // Add initial delay before starting to scroll
        autoScrollTimeoutRef.current = setTimeout(() => {
          // Initial scroll
          scrollFn(e);

          // Continue scrolling while hovering
          autoScrollIntervalRef.current = setInterval(() => {
            scrollFn(e);
          }, edgeScroll.interval);
        }, edgeScroll.startDelay);
      },
      [isAutoScrolling, prev, next, edgeScroll.interval, edgeScroll.startDelay]
    );

    const stopAutoScroll = useCallback(() => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
        autoScrollTimeoutRef.current = null;
      }
      setIsAutoScrolling(false);
    }, []);

    const hoverZoneStyles: React.CSSProperties = {
      position: 'absolute',
      zIndex: 2,
      ...(listType === 'horizontal'
        ? {
            top: 0,
            height: '100%',
          }
        : {
            left: 0,
            width: '100%',
          }),
    };

    return (
      <div className={`scroll-view-parent ${listType}`} style={parentStyle}>
        {edgeScroll.enabled && startIndex > 0 && (
          <div
            className="edge-scroll-zone edge-scroll-zone-start"
            style={{
              ...hoverZoneStyles,
              ...(listType === 'horizontal' ? { left: 0 } : { top: 0 }),
            }}
            onMouseEnter={(e: React.MouseEvent) => startAutoScroll('prev', e)}
            onMouseLeave={stopAutoScroll}
          />
        )}

        {edgeScroll.enabled && startIndex < itemsTotal - itemsCount && (
          <div
            className="edge-scroll-zone edge-scroll-zone-end"
            style={{
              ...hoverZoneStyles,
              ...(listType === 'horizontal' ? { right: 0 } : { bottom: 0 }),
            }}
            onMouseEnter={(e: React.MouseEvent) => startAutoScroll('next', e)}
            onMouseLeave={stopAutoScroll}
          />
        )}

        {/* Navigation Arrows */}
        <NavigationArrow
          direction="start"
          icon={
            listType === 'horizontal'
              ? arrows.startIcon || <SvgArrowLeft />
              : arrows.startIcon || <SvgArrowUp />
          }
          onClick={(e: React.MouseEvent) => prev(e)}
          show={arrows.show && showStartArrow}
          listType={listType}
          style={arrows.style}
          classNames={arrows.classNames}
        />

        <NavigationArrow
          direction="end"
          icon={
            listType === 'horizontal'
              ? arrows.endIcon || <SvgArrowRight />
              : arrows.endIcon || <SvgArrowDown />
          }
          onClick={(e: React.MouseEvent) => next(e)}
          show={arrows.show && showEndArrow}
          listType={listType}
          style={arrows.style}
          classNames={arrows.classNames}
        />

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
