import React, { useEffect, useRef, useState } from 'react';
import '../../styles/InoText.css';

interface InoTextProps {
  children: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
  color?: 'primary' | 'secondary' | 'error' | 'success';
  marquee?: boolean;
  marqueeSpeed?: number;
  className?: string;
  isActive?: boolean;
  delay?: number;
  gap?: number;
}

export const InoText: React.FC<InoTextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  marquee = false,
  marqueeSpeed = 50,
  className = '',
  isActive = false,
  delay = 1000,
  gap = 50,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);

  // Check if text overflows container
  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && contentRef.current) {
        const container = containerRef.current;
        const content = contentRef.current;

        const hasOverflow = content.scrollWidth > container.clientWidth;
        setIsOverflowing(hasOverflow);
        setContentWidth(content.scrollWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children]);

  // Handle marquee animation start after delay
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isOverflowing && marquee && isActive) {
      timeoutId = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);
    } else {
      setShouldAnimate(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOverflowing, marquee, isActive, delay]);

  const containerStyle = {
    '--content-width': `${contentWidth}px`,
    '--gap': `${gap}px`,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className={`
        ino-text 
        ino-text--${variant} 
        ino-text--${color}
        ${isActive ? 'ino-text--active' : ''}
        ${shouldAnimate ? 'ino-text--marquee' : ''}
        ${className}
      `}
      style={containerStyle}
    >
      <div
        ref={contentRef}
        className="ino-text__content"
        style={{
          animationDuration: `${marqueeSpeed}s`,
          whiteSpace: marquee ? 'nowrap' : 'normal',
        }}
      >
        <span className="ino-text__original">{children}</span>
        {shouldAnimate && (
          <span className="ino-text__duplicate" aria-hidden="true">
            {children}
          </span>
        )}
      </div>
    </div>
  );
};
