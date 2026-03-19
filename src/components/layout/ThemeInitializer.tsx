import { useEffect } from 'react';
import { useThemeStore } from '../../store/themeStore';

export const ThemeInitializer = () => {
  const { themeMode, colors } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;

    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    Object.entries(colors).forEach(([shade, value]) => {
      root.style.setProperty(`--brand-${shade}`, value as string);
    });
  }, [themeMode, colors]);

  return null;
};