import { render, screen, cleanup } from '@testing-library/react';
import { vi } from 'vitest';

describe('App component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  it('renders RickAndMorty inside ErrorBoundary', async () => {
    vi.mock('./pages/RickAndMorty', () => ({
      RickAndMorty: () => <div>Rick and Morty Component</div>,
    }));

    const { default: App } = await import('./App');

    render(<App />);
    expect(screen.getByText('Rick and Morty Component')).toBeInTheDocument();
  });
});
