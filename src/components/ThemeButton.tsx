import { useContext } from 'react';
import { ThemeContext } from '../Context/createContext';
import { toggleTheme } from '../Context/toggleTheme';

export const ThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Context not found');
  }
  const { theme, setTheme } = context;
  return (
    <button
      className="theme-toggle"
      onClick={() => {
        toggleTheme(theme, setTheme);
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
