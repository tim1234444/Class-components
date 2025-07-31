/// <reference types="vitest/globals" />
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { Component } from 'react';
import { RickAndMorty } from '../../../pages/RickAndMorty';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../../store';

class BrokenComponent extends Component {
  render() {
    throw new Error('Error');
    return <></>;
  }
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    cleanup();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('Catches and handles JavaScript errors in child components', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Произошла ошибка')).toBeInTheDocument();
  });

  it('Displays fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Попробовать снова')).toBeInTheDocument();
  });

  it('Logs error to console', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
    );

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0].length).toBeGreaterThan(0);
  });

  it('Triggers error boundary fallback UI', () => {
    render(
      <MemoryRouter>
        {' '}
        <Provider store={store}>
          <ErrorBoundary>
            <RickAndMorty />
          </ErrorBoundary>
        </Provider>
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: /Вызвать ошибку/i });

    fireEvent.click(button);

    expect(screen.getByText(/произошла ошибка/i)).toBeInTheDocument();
  });

  it('Throws error when test button is clicked', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MemoryRouter>
        {' '}
        <ErrorBoundary>
          <RickAndMorty />
        </ErrorBoundary>
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: /вызвать ошибку/i });

    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
  });
});
