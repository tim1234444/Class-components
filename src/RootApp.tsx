import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';
import { store } from './store';
import { ThemeContext } from './Context/createContext';
import { Detail } from './components/RickAndMorty/Detail/Detail';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFound from './pages/NotFound/NotFound';
import { ErrorBoundary } from './components/RickAndMorty/ErrorBoundary/ErrorBoundary';
import { RickAndMorty } from './pages/RickAndMorty';

export function RootApp() {
  const [theme, setTheme] = useState(
    localStorage.getItem('app-theme') || 'light',
  );
  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeContext value={{ theme, setTheme }}>
            <div className={`main-container ${theme}-theme`}>
              {' '}
              <Routes>
                <Route path="/" element={<RickAndMorty />}>
                  <Route index element={<Detail />} />
                </Route>
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </ThemeContext>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}
