export const palette = {
  // Mavi tonları
  blue: {
    light: '#007AFF',
    dark: '#0A84FF',
  },
  
  // Gri tonları
  gray: {
    100: '#FFFFFF',
    200: '#F5F5F5',
    300: '#EBEBF5',
    400: '#DDDDDD',
    500: '#666666',
    600: '#333333',
    700: '#1C1C1E',
    800: '#121212',
  },

  // Özel renkler
  custom: {
    darkBackground: '#121C24',
    darkSurface: '#1E2429',
    darkBorder: '#2C3136',
    darkText: {
      primary: '#FFFFFF',
      secondary: '#A0A7B0',
      tertiary: '#6B7280',
    },
    accent: {
      yellow: '#FFB800',
      blue: '#4B9BFF',
    }
  },

  // Durum renkleri
  status: {
    success: {
      light: '#34C759',
      dark: '#32D74B',
    },
    warning: '#FFB800',
    error: {
      light: '#FF3B30',
      dark: '#FF453A',
    },
    info: {
      light: '#007AFF',
      dark: '#4B9BFF',
    },
  },
} as const; 