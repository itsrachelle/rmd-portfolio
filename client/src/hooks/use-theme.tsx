import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ColorTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    primaryBrown: string;
    accentNude: string;
    secondaryDark: string;
    background: string;
    surface: string;
  };
  preview: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface ThemeContextType {
  currentTheme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
  resetToDefault: () => void;
}

const defaultTheme: ColorTheme = {
  id: 'warm-nude',
  name: 'Warm Nude (Default)',
  description: 'Modern and inviting with warm earth tones',
  colors: {
    primaryBrown: '28 25% 23%',
    accentNude: '30 30% 85%',
    secondaryDark: '20 14.3% 4.1%',
    background: '0 0% 100%',
    surface: '30 20% 95%'
  },
  preview: {
    primary: 'hsl(28, 25%, 23%)',
    secondary: 'hsl(30, 30%, 85%)',
    accent: 'hsl(20, 14.3%, 4.1%)'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(() => {
    const savedTheme = localStorage.getItem('color-theme');
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch {
        return defaultTheme;
      }
    }
    return defaultTheme;
  });

  const applyTheme = (theme: ColorTheme) => {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--primary-brown', theme.colors.primaryBrown);
    root.style.setProperty('--accent-nude', theme.colors.accentNude);
    root.style.setProperty('--secondary-dark', theme.colors.secondaryDark);
    root.style.setProperty('--background', theme.colors.background);
    root.style.setProperty('--surface', theme.colors.surface);
  };

  const setTheme = (theme: ColorTheme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    localStorage.setItem('color-theme', JSON.stringify(theme));
  };

  const resetToDefault = () => {
    setTheme(defaultTheme);
  };

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, resetToDefault }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}