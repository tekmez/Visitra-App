import { palette } from './palette';
import { ColorScheme, Theme, ThemeColors } from './types';

const lightColors: ThemeColors = {
  primary: palette.blue.light,
  secondary: palette.status.warning,
  
  text: {
    primary: palette.gray[800],
    secondary: palette.gray[600],
    tertiary: palette.gray[500],
    error: palette.status.error.light,
  },

  background: {
    primary: palette.gray[100],
    secondary: palette.gray[200],
    card: palette.gray[100],
    modal: palette.gray[100],
  },

  border: {
    primary: palette.gray[400],
    secondary: palette.gray[300],
    error: palette.status.error.light,
  },

  status: {
    success: palette.status.success.light,
    warning: palette.status.warning,
    error: palette.status.error.light,
    info: palette.status.info.light,
  },
};

const darkColors: ThemeColors = {
  primary: palette.custom.accent.blue,
  secondary: palette.custom.accent.yellow,
  
  text: {
    primary: palette.custom.darkText.primary,
    secondary: palette.custom.darkText.secondary,
    tertiary: palette.custom.darkText.tertiary,
    error: palette.status.error.dark,
  },

  background: {
    primary: palette.custom.darkBackground,
    secondary: palette.custom.darkSurface,
    card: palette.custom.darkSurface,
    modal: palette.custom.darkSurface,
  },

  border: {
    primary: palette.custom.darkBorder,
    secondary: palette.custom.darkBorder,
    error: palette.status.error.dark,
  },

  status: {
    success: palette.status.success.dark,
    warning: palette.status.warning,
    error: palette.status.error.dark,
    info: palette.status.info.dark,
  },
};

export const themes: Record<ColorScheme, Theme> = {
  light: {
    colors: lightColors,
    isDark: false,
  },
  dark: {
    colors: darkColors,
    isDark: true,
  },
}; 