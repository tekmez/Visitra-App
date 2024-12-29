export const colors = {
  // Ana renkler
  primary: "#007AFF",
  secondary: "#FFB800",
  
  // Metin renkleri
  text: {
    primary: "#000000",
    secondary: "#333333",
    tertiary: "#666666",
    error: "#FF3B30",
  },

  // Arka plan renkleri
  background: {
    primary: "#FFFFFF",
    secondary: "#F5F5F5",
  },

  // Kenarlık renkleri
  border: {
    primary: "#DDDDDD",
    error: "#FF3B30",
  },

  // Durum renkleri
  status: {
    success: "#34C759",
    warning: "#FFB800",
    error: "#FF3B30",
    info: "#007AFF",
  },
} as const;

export type Colors = typeof colors; 