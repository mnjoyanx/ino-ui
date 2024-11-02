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
    arrows = {
      show: false,
      startIcon: '←',
      endIcon: '→',
      style: {},
      className: '',
    },
  }) => {
    const scrollViewRef = useRef<HTMLDivElement>(null);
    const [startIndex, setStartIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
    const [showStartArrow, setShowStartArrow] = useState(false);
    const [showEndArrow, setShowEndArrow] = useState(false);

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

    const next = (count = 1) => {
      setActiveIndex(index => {
        if (index === itemsTotal - 1) {
          listType === 'horizontal'
            ? requestAnimationFrame(onRight)
            : requestAnimationFrame(onDown);
        } else {
          index += count;
          if (index > itemsTotal - 1) index = itemsTotal - 1;
        }

        changeStartIndex(index);

        return index;
      });
    };

    const prev = (count = 1) => {
      setActiveIndex(index => {
        if (index === 0) {
          listType === 'horizontal'
            ? requestAnimationFrame(onLeft)
            : requestAnimationFrame(onUp);
        } else {
          index -= count;
          if (index < 0) index = 0;
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
      const start = startIndex - buffer;
      const end = startIndex + itemsCount + buffer;

      for (let i = start; i < end; i++) {
        if (i >= 0 && i < itemsTotal) {
          const itemProps: ItemProps = {
            key: `${uniqueKey}${i}`,
            index: i,
            style: getItemStyle(i),
            isActive: i === activeIndex && isActive,
            item: data[i],
            onUp,
            onDown,
            onLeft,
            onRight,
            onMouseEnter: () => onMouseEnterItem(i),
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
      data,
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

    useEffect(() => {
      if (arrows.show) {
        setShowStartArrow(startIndex > 0);
        setShowEndArrow(startIndex < itemsTotal - itemsCount);
      }
    }, [startIndex, itemsTotal, itemsCount, arrows.show]);

    const keyDownOptions = useMemo(
      () => ({
        isActive: isActive && nativeControle,
        // debounce,
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

    return (
      <div className={`scroll-view-parent ${listType}`} style={parentStyle}>
        <NavigationArrow
          direction="start"
          icon={
            listType === 'horizontal'
              ? arrows.startIcon
              : arrows.startIcon || <SvgArrowLeft />
          }
          onClick={() => prev()}
          show={arrows.show && showStartArrow}
          listType={listType}
          customStyle={arrows.style}
          className={arrows.className}
        />

        <NavigationArrow
          direction="end"
          icon={
            listType === 'horizontal'
              ? arrows.endIcon
              : arrows.endIcon || <SvgArrowRight />
          }
          onClick={() => next()}
          show={arrows.show && showEndArrow}
          listType={listType}
          customStyle={arrows.style}
          className={arrows.className}
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
