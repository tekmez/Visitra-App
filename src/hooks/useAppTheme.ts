import { useTheme } from '../context/ThemeContext';

export function useAppTheme() {
  const { theme, colorScheme, toggleColorScheme } = useTheme();
  
  return {
    colors: theme.colors,
    isDark: theme.isDark,
    colorScheme,
    toggleColorScheme,
  };
} 