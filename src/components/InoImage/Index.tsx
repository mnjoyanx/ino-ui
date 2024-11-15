import React, { useEffect, useRef, useState } from 'react';

interface ImageComponentProps {
  src: string;
  alt: string;
  fallbackSrc?: string; // Optional fallback image source in case of error
  quality?: number; // Compression quality (0 to 1)
  backgroundColor?: string; // Background color while loading
}

const InoImage: React.FC<ImageComponentProps> = ({
  src,
  alt,
  fallbackSrc = 'fallback.jpg',
  quality = 0.7,
  backgroundColor = '#e0e0e0', // Default loading background color
}) => {
  const [displaySrc, setDisplaySrc] = useState<string>(''); // Initially empty to show background color
  const [, setHasError] = useState<boolean>(false); // Track if an error occurs
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // Controls fade-in effect
  const containerRef = useRef<HTMLDivElement>(null); // Reference to image container
  const canvasRef = useRef<HTMLCanvasElement>(null); // Reference to canvas for compression

  // Step 1: Get box dimensions and cache them
  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({
    width: 345,
    height: 388,
  });
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setBoxSize({ width, height });
    }
  }, []);

  // Step 2: Load and compress the image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Prevents CORS tainting
    img.src = src;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = boxSize.width;
        canvas.height = boxSize.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, boxSize.width, boxSize.height);

          // Convert canvas to compressed data URL
          const compressedImageUrl = canvas.toDataURL('image/jpeg', quality);
          setDisplaySrc(compressedImageUrl); // Set compressed image as display source

          // Cache in sessionStorage to avoid redundant processing
          const cacheKey = `imageCache_${src}`;
          sessionStorage.setItem(cacheKey, compressedImageUrl);
        }
      }
    };

    img.onerror = () => {
      setDisplaySrc(fallbackSrc); // Show fallback image if loading fails
      setHasError(true);
    };
  }, [src, boxSize, quality, fallbackSrc]);

  return (
    <div
      ref={containerRef}
      style={{
        width: boxSize.width,
        height: boxSize.height,
        overflow: 'hidden',
        backgroundColor:
          displaySrc && isLoaded ? 'transparent' : backgroundColor, // Background color while loading
        position: 'relative',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'none' }} />{' '}
      {/* Hidden canvas for compression */}
      {displaySrc && (
        <img
          src={displaySrc}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0, // Set to 1 once loaded, otherwise 0 for fade-in
            transition: 'opacity 0.5s ease-in',
          }}
          onLoad={() => setIsLoaded(true)} // Set to true once image is fully loaded
        />
      )}
    </div>
  );
};

export default InoImage;
