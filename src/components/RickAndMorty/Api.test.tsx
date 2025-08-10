import { cleanup, render, screen } from '@testing-library/react';
import { RickAndMorty } from '../../pages/RickAndMorty';
import { vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { mockedData } from '../../__test__/mockedData';
import { MemoryRouter } from 'react-router';
import { ThemeContext } from '../../Context/createContext';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('RickAndMorty component', () => {
  const fetchMock = createFetchMock(vi);

  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    vi.restoreAllMocks();
    cleanup();
    fetchMock.resetMocks();

    localStorage.clear();
  });
  it('Handles API error responses(404)', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeContext value={{ theme: 'light', setTheme: () => {} }}>
            <RickAndMorty />
          </ThemeContext>
        </Provider>
      </MemoryRouter>,
    );

    expect(await screen.findByRole('error')).toBeInTheDocument();
  });
  it('Handles API error responses(not404)', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeContext value={{ theme: 'light', setTheme: () => {} }}>
            <RickAndMorty />
          </ThemeContext>
        </Provider>
      </MemoryRouter>,
    );

    expect(await screen.findByRole('error')).toBeInTheDocument();
  });
  it('renders characters from API (success case) and Makes initial API call on component mount', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockedData));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeContext value={{ theme: 'light', setTheme: () => {} }}>
            <RickAndMorty />
          </ThemeContext>
        </Provider>
      </MemoryRouter>,
    );

    expect(await screen.findByText('Worldender')).toBeInTheDocument();
    expect(screen.getByText('Wedding Bartender')).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        url: expect.stringContaining(
          'https://rickandmortyapi.com/api/character/?name=&page=1',
        ),
      }),
    );
  });
  it('Handles search term from localStorage on initial load', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockedData));
    localStorage.setItem('field', 'Rick');

    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeContext value={{ theme: 'light', setTheme: () => {} }}>
            <RickAndMorty />
          </ThemeContext>
        </Provider>
      </MemoryRouter>,
    );
    await screen.findByText('Worldender');
    expect(fetchMock.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        url: expect.stringContaining(
          'https://rickandmortyapi.com/api/character/?name=Rick&page=1',
        ),
      }),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
