/// <reference types="react" />
export interface InoSkeletonProps {
    /** Width of the skeleton in rem units or percentage */
    width?: string | number;
    /** Height of the skeleton in rem units or percentage */
    height?: string | number;
    /** Shape of the skeleton */
    variant?: 'rectangular' | 'circular' | 'text';
    /** Text variant style (only applies when variant is 'text') */
    textVariant?: 'heading' | 'subheading' | 'body';
    /** Animation type */
    animation?: 'pulse' | 'wave' | 'none';
    /** Custom CSS classes */
    className?: string;
    /** Custom inline styles */
    style?: React.CSSProperties;
    /** Border radius in rem units */
    borderRadius?: number;
}
