import React from 'react';
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
export declare const InoText: React.FC<InoTextProps>;
export {};
