import { cleanup, render, screen } from '@testing-library/react';
import { RickAndMorty } from '../../pages/RickAndMorty';
import { vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { mockedData } from '../../__test__/mockedData';
import { MemoryRouter } from 'react-router';
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

    render(
      <MemoryRouter>
        <RickAndMorty />
      </MemoryRouter>,
    );

    expect(await screen.findByText('Worldender')).toBeInTheDocument();
    expect(screen.getByText('Wedding Bartender')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=&page=1',
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it('Handles search term from localStorage on initial load', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockedData));
    localStorage.setItem('field', 'Rick');

    render(
      <MemoryRouter>
        <RickAndMorty />
      </MemoryRouter>,
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=Rick&page=1',
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it('Handles API error responses(404)', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });
    render(
      <MemoryRouter>
        <RickAndMorty />
      </MemoryRouter>,
    );

    expect(await screen.findByRole('error')).toBeInTheDocument();
  });
  it('Handles API error responses(not404)', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });
    render(
      <MemoryRouter>
        <RickAndMorty />
      </MemoryRouter>,
    );

    expect(await screen.findByRole('error')).toBeInTheDocument();
  });
  it('fetches character by ID when id param is present', async () => {
    const mockCharacter = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)' },
      location: { name: 'Citadel of Ricks' },
      episode: ['ep1', 'ep2'],
      image: 'https://rick.com/image.jpg',
      created: '2023-01-01T00:00:00.000Z',
    };

    fetchMock.mockResponse(JSON.stringify(mockCharacter));

    render(
      <MemoryRouter initialEntries={['/?id=1']}>
        <RickAndMorty />
      </MemoryRouter>,
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/1',
    );
  });
});
