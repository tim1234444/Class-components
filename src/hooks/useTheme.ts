'use client';

import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('app-theme');
    if (saved) {
      setTheme(saved as 'light' | 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  return { theme, setTheme };
}
