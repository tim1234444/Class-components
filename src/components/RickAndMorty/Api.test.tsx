import { cleanup, render, screen } from '@testing-library/react';
import { RickAndMorty } from '../../pages/RickAndMorty';
import { vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { mockedData } from '../../__test__/mockedData';
describe('RickAndMorty component', () => {
  const fetchMock = createFetchMock(vi);

  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    localStorage.clear();
    cleanup();
  });

  it('renders characters from API (success case) and Makes initial API call on component mount', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockedData));

    render(<RickAndMorty />);

    expect(await screen.findByText('Worldender')).toBeInTheDocument();
    expect(screen.getByText('Wedding Bartender')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=',
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it('Handles search term from localStorage on initial load', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockedData));
    localStorage.setItem('field', 'Rick');

    render(<RickAndMorty />);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=Rick',
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it('Handles API error responses(404)', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });
    render(<RickAndMorty />);

    expect(await screen.findByRole('error')).toBeInTheDocument();
  });
  it('Handles API error responses(not404)', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });
    render(<RickAndMorty />);

    expect(await screen.findByRole('error')).toBeInTheDocument();
  });
});
