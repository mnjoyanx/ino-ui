export const SIZES = {
    small: 'small',
    medium: 'medium',
    large: 'large',
} as const;

export const VARIANTS = {
    primary: 'primary',
    secondary: 'secondary',
    ghost: 'ghost',
} as const;

export type Size = keyof typeof SIZES;
export type Variant = keyof typeof VARIANTS; 