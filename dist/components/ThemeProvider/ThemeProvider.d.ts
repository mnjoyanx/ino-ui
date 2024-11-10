import React from 'react';
import { InoTheme } from '../../types/theme';
interface ThemeProviderProps {
    theme: InoTheme;
    children: React.ReactNode;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export {};
