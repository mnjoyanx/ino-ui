export interface InoTheme {
    colors?: {
        primary?: string;
        secondary?: string;
        danger?: string;
        warning?: string;
        text?: {
            primary?: string;
            secondary?: string;
            danger?: string;
            warning?: string;
        };
        border?: {
            primary?: string;
            secondary?: string;
        };
        background?: {
            primary?: string;
            secondary?: string;
        };
    };
    fonts?: {
        sizes?: {
            small?: string;
            medium?: string;
            large?: string;
            xlarge?: string;
            xxlarge?: string;
        };
        weights?: {
            light?: number;
            regular?: number;
            medium?: number;
            bold?: number;
        };
    };
    borderRadius?: {
        small?: string;
        medium?: string;
        large?: string;
        xlarge?: string;
        xxlarge?: string;
    };
}
