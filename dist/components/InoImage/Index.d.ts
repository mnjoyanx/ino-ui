import React from 'react';
interface ImageComponentProps {
    src: string;
    alt: string;
    fallbackSrc?: string;
    quality?: number;
    backgroundColor?: string;
}
declare const InoImage: React.FC<ImageComponentProps>;
export default InoImage;
