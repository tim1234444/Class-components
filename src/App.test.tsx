import { render, screen, cleanup } from '@testing-library/react';

import { vi } from 'vitest';
import { ThemeContext } from './Context/createContext';
import { store } from './store';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { RickAndMorty } from './pages/RickAndMorty';

describe('App component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  it('renders RickAndMorty inside ErrorBoundary', async () => {
    vi.mock('./pages/RickAndMorty', () => ({
      RickAndMorty: () => <div>Rick and Morty Component</div>,
    }));

    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <ThemeContext.Provider value={{ theme: 'light', setTheme: () => {} }}>
            <Routes>
              <Route path="/" element={<RickAndMorty />} />
            </Routes>
          </ThemeContext.Provider>
        </Provider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Rick and Morty Component')).toBeInTheDocument();
  });
});
