import React, { useCallback, useEffect, useRef, useState } from 'react';
import useKeydown from '../../hooks/useKeydown';
import { ScrollViewProps } from './ScrollView.types';
import SvgArrowUp from '../Svgs/SvgArrowUp';
import SvgArrowDown from '../Svgs/SvgArrowDown';

export const ScrollView: React.FC<ScrollViewProps> = ({
  children,
  isActive = false,
  onReachBottom,
  onStartScroll,
  onEndScroll,
  onDown,
  onUp,
  onOk,
  onBack,
  classNames = '',
  scrollStep = 50,
  showScrollIndicators = true,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTopIndicator, setShowTopIndicator] = useState(false);
  const [showBottomIndicator, setShowBottomIndicator] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    // Show/hide scroll indicators
    setShowTopIndicator(scrollTop > 0);
    setShowBottomIndicator(scrollTop + clientHeight < scrollHeight);

    // Handle scroll start/end
    if (!isScrolling) {
      setIsScrolling(true);
      onStartScroll?.();
    }

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
      onEndScroll?.();

      // Check if reached bottom
      if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
        onReachBottom?.();
      }
    }, 150);
  }, [isScrolling, onStartScroll, onEndScroll, onReachBottom]);

  const scrollUp = useCallback(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      top: -scrollStep,
      behavior: 'smooth',
    });

    if (scrollRef.current.scrollTop === 0) {
      onUp?.();
    }
  }, [scrollStep, onUp]);

  const scrollDown = useCallback(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      top: scrollStep,
      behavior: 'smooth',
    });

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      onDown?.();
    }
  }, [scrollStep, onDown]);

  useKeydown({
    isActive,
    up: scrollUp,
    down: scrollDown,
    ok: onOk,
    back: onBack,
  });

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <div className={`ino-scroll-view-container ${classNames}`}>
      {showScrollIndicators && showTopIndicator && (
        <div className="ino-scroll-indicator ino-scroll-indicator--top">
          <SvgArrowUp />
        </div>
      )}

      <div
        ref={scrollRef}
        className="ino-scroll-view-content"
        onScroll={handleScroll}
      >
        {children}
      </div>

      {showScrollIndicators && showBottomIndicator && (
        <div className="ino-scroll-indicator ino-scroll-indicator--bottom">
          <SvgArrowDown />
        </div>
      )}
    </div>
  );
};
