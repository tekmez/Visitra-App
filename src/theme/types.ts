export type ColorScheme = 'light' | 'dark';

export interface ThemeColors {
  // Ana renkler
  primary: string;
  secondary: string;
  
  // Metin renkleri
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    error: string;
  };

  // Arka plan renkleri
  background: {
    primary: string;
    secondary: string;
    card: string;
    modal: string;
  };

  // Kenarlık renkleri
  border: {
    primary: string;
    secondary: string;
    error: string;
  };

  // Durum renkleri
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

export interface Theme {
  colors: ThemeColors;
  isDark: boolean;
} 