import React, { useEffect, useState } from 'react';
import sharp from 'sharp';

interface InoImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp' | 'avif';
  placeholder?: 'blur' | 'empty';
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export const InoImage: React.FC<InoImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 80,
  format = 'webp',
  placeholder = 'empty',
  className = '',
  onLoad,
  onError,
}) => {
  const [optimizedSrc, setOptimizedSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const optimizeImage = async () => {
      try {
        setIsLoading(true);

        // Fetch the image
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Process with Sharp
        let sharpInstance = sharp(buffer);

        // Resize if dimensions provided
        if (width || height) {
          sharpInstance = sharpInstance.resize(width, height, {
            fit: 'cover',
            position: 'center',
          });
        }

        // Convert to specified format
        switch (format) {
          case 'jpeg':
            sharpInstance = sharpInstance.jpeg({ quality });
            break;
          case 'png':
            sharpInstance = sharpInstance.png({ quality });
            break;
          case 'webp':
            sharpInstance = sharpInstance.webp({ quality });
            break;
          case 'avif':
            sharpInstance = sharpInstance.avif({ quality });
            break;
        }

        // Get optimized buffer
        const optimizedBuffer = await sharpInstance.toBuffer();

        // Convert to base64
        const base64 = `data:image/${format};base64,${optimizedBuffer.toString(
          'base64'
        )}`;
        setOptimizedSrc(base64);
        setIsLoading(false);
        onLoad?.();
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Image optimization failed');
        setError(error);
        onError?.(error);
      }
    };

    optimizeImage();
  }, [src, width, height, quality, format]);

  if (error) {
    return (
      <div className={`ino-image ino-image--error ${className}`}>
        Failed to load image
      </div>
    );
  }

  return (
    <div className={`ino-image ${className}`} style={{ position: 'relative' }}>
      {isLoading && placeholder === 'blur' && (
        <div className="ino-image__placeholder">
          <div className="ino-image__blur" />
        </div>
      )}
      {optimizedSrc && (
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          className={`ino-image__img ${isLoading ? 'loading' : 'loaded'}`}
        />
      )}
    </div>
  );
};
