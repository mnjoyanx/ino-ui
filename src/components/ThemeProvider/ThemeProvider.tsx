import React, { useEffect } from 'react';
import { InoTheme } from '../../types/theme';

interface ThemeProviderProps {
  theme: InoTheme;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  useEffect(() => {
    const root = document.documentElement;

    // Colors
    if (theme.colors) {
      if (theme.colors.primary) {
        root.style.setProperty('--ino-bg-primary', theme.colors.primary);
        root.style.setProperty('--ino-border-primary', theme.colors.primary);
        root.style.setProperty('--ino-shadow-primary', theme.colors.primary);
      }
      if (theme.colors.secondary) {
        root.style.setProperty('--ino-bg-secondary', theme.colors.secondary);
      }
      if (theme.colors.danger) {
        root.style.setProperty('--ino-bg-danger', theme.colors.danger);
      }
      if (theme.colors.warning) {
        root.style.setProperty('--ino-bg-warning', theme.colors.warning);
      }

      // Text colors
      if (theme.colors.text?.primary) {
        root.style.setProperty('--ino-text-primary', theme.colors.text.primary);
      }
      if (theme.colors.text?.secondary) {
        root.style.setProperty(
          '--ino-text-secondary',
          theme.colors.text.secondary
        );
      }
    }

    // Font sizes
    if (theme.fonts?.sizes) {
      if (theme.fonts.sizes.small) {
        root.style.setProperty(
          '--ino-font-size-small',
          theme.fonts.sizes.small
        );
      }
      if (theme.fonts.sizes.medium) {
        root.style.setProperty(
          '--ino-font-size-medium',
          theme.fonts.sizes.medium
        );
      }
      if (theme.fonts.sizes.large) {
        root.style.setProperty(
          '--ino-font-size-large',
          theme.fonts.sizes.large
        );
      }
    }

    // Font weights
    if (theme.fonts?.weights) {
      if (theme.fonts.weights.light) {
        root.style.setProperty(
          '--ino-font-weight-light',
          theme.fonts.weights.light.toString()
        );
      }
      if (theme.fonts.weights.regular) {
        root.style.setProperty(
          '--ino-font-weight-regular',
          theme.fonts.weights.regular.toString()
        );
      }
    }

    // Border radius
    if (theme.borderRadius) {
      if (theme.borderRadius.small) {
        root.style.setProperty(
          '--ino-border-radius-small',
          theme.borderRadius.small
        );
      }
      if (theme.borderRadius.medium) {
        root.style.setProperty(
          '--ino-border-radius-medium',
          theme.borderRadius.medium
        );
      }
    }
  }, [theme]);

  return <>{children}</>;
};
