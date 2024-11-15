import React, { useEffect, useRef, useState } from 'react';

interface InoTextProps {
  children: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
  color?: 'primary' | 'secondary' | 'error' | 'success';
  weight?: 'normal' | 'medium' | 'bold';
  marquee?: boolean;
  marqueeSpeed?: number;
  className?: string;
  isActive?: boolean;
}

export const InoText: React.FC<InoTextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  marquee = false,
  marqueeSpeed = 50,
  className = '',
  isActive = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [marqueePosition, setMarqueePosition] = useState(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && contentRef.current) {
        const isTextOverflowing =
          contentRef.current.scrollWidth > containerRef.current.clientWidth;
        setIsOverflowing(isTextOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children]);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (contentRef.current && isOverflowing && marquee && isActive) {
        const contentWidth = contentRef.current.scrollWidth;
        const containerWidth = containerRef.current?.clientWidth || 0;
        const maxOffset = contentWidth - containerWidth;

        // Calculate position based on time and speed
        const newPosition =
          (progress / marqueeSpeed) % (maxOffset + containerWidth);
        setMarqueePosition(-newPosition);

        // Reset position when complete cycle is done
        if (newPosition >= maxOffset + containerWidth) {
          startTime = timestamp;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    if (isOverflowing && marquee && isActive) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      setMarqueePosition(0);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isOverflowing, marquee, isActive, marqueeSpeed]);

  return (
    <div
      ref={containerRef}
      className={`
        ino-text 
        ino-text--${variant} 
        ino-text--${color}
        ino-text--${weight}
        ${isActive ? 'ino-text--active' : ''}
        ${className}
      `}
    >
      <div
        ref={contentRef}
        className="ino-text__content"
        style={{
          transform: `translateX(${marqueePosition}px)`,
          whiteSpace: marquee ? 'nowrap' : 'normal',
        }}
      >
        {children}
      </div>
    </div>
  );
};
