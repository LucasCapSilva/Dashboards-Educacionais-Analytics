import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ThemeColors {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export const themePresets: Record<string, ThemeColors> = {
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
    950: '#4c0519',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  }
};

interface ThemeState {
  themeMode: 'light' | 'dark';
  schoolName: string;
  logoUrl: string | null;
  colors: ThemeColors;
  toggleTheme: () => void;
  setSchoolName: (name: string) => void;
  setLogoUrl: (url: string | null) => void;
  setThemeColors: (colors: ThemeColors) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeMode: 'dark',
      schoolName: 'Tech Academy',
      logoUrl: null,
      colors: themePresets['indigo'],
      toggleTheme: () => set((state) => ({ themeMode: state.themeMode === 'light' ? 'dark' : 'light' })),
      setSchoolName: (name) => set({ schoolName: name }),
      setLogoUrl: (url) => set({ logoUrl: url }),
      setThemeColors: (colors) => set({ colors }),
    }),
    {
      name: 'edtech-theme-storage',
    }
  )
);