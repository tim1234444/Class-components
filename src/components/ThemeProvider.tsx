'use client';

import { ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';
import { ThemeContext } from '../Context/createContext';

type Props = {
  children: ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <div className={`main-container ${theme}-theme`}>{children}</div>
    </ThemeContext>
  );
}
