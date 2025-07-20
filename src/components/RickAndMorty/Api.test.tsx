import { cleanup, render, screen } from '@testing-library/react';
import { RickAndMorty } from '../../pages/RickAndMorty';
import { vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

describe('RickAndMorty component', () => {
  const fetchMock = createFetchMock(vi);

  beforeAll(() => {
    fetchMock.enableMocks();
  });
  const mockedData = {
    info: {
      count: 59,
      pages: 3,
      next: 'https://rickandmortyapi.com/api/character/?page=2&name=de',
      prev: null,
    },
    results: [
      {
        id: 12,
        name: 'Alexander',
        status: 'Dead',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (C-137)',
          url: 'https://rickandmortyapi.com/api/location/1',
        },
        location: {
          name: 'Anatomy Park',
          url: 'https://rickandmortyapi.com/api/location/5',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/12.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/3'],
        url: 'https://rickandmortyapi.com/api/character/12',
        created: '2017-11-04T20:32:33.144Z',
      },
      {
        id: 23,
        name: 'Arcade Alien',
        status: 'unknown',
        species: 'Alien',
        type: '',
        gender: 'Male',
        origin: {
          name: 'unknown',
          url: '',
        },
        location: {
          name: 'Immortality Field Resort',
          url: 'https://rickandmortyapi.com/api/location/7',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/23.jpeg',
        episode: [
          'https://rickandmortyapi.com/api/episode/13',
          'https://rickandmortyapi.com/api/episode/19',
          'https://rickandmortyapi.com/api/episode/21',
          'https://rickandmortyapi.com/api/episode/25',
          'https://rickandmortyapi.com/api/episode/26',
        ],
        url: 'https://rickandmortyapi.com/api/character/23',
        created: '2017-11-05T08:43:05.095Z',
      },
      {
        id: 32,
        name: 'Bearded Lady',
        status: 'Dead',
        species: 'Alien',
        type: 'Parasite',
        gender: 'Female',
        origin: {
          name: 'unknown',
          url: '',
        },
        location: {
          name: 'Earth (Replacement Dimension)',
          url: 'https://rickandmortyapi.com/api/location/20',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/32.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/15'],
        url: 'https://rickandmortyapi.com/api/character/32',
        created: '2017-11-05T09:18:04.184Z',
      },
      {
        id: 59,
        name: 'Brad Anderson',
        status: 'Dead',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (Replacement Dimension)',
          url: 'https://rickandmortyapi.com/api/location/20',
        },
        location: {
          name: 'Earth (Replacement Dimension)',
          url: 'https://rickandmortyapi.com/api/location/20',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/59.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/7'],
        url: 'https://rickandmortyapi.com/api/character/59',
        created: '2017-11-05T11:41:38.964Z',
      },
      {
        id: 69,
        name: 'Commander Rick',
        status: 'Dead',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'unknown',
          url: '',
        },
        location: {
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/69.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/22'],
        url: 'https://rickandmortyapi.com/api/character/69',
        created: '2017-11-30T11:28:06.461Z',
      },
      {
        id: 79,
        name: 'Crab Spider',
        status: 'Alive',
        species: 'Alien',
        type: 'Animal',
        gender: 'unknown',
        origin: {
          name: 'Hideout Planet',
          url: 'https://rickandmortyapi.com/api/location/27',
        },
        location: {
          name: 'Hideout Planet',
          url: 'https://rickandmortyapi.com/api/location/27',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/79.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/10'],
        url: 'https://rickandmortyapi.com/api/character/79',
        created: '2017-11-30T14:18:16.899Z',
      },
      {
        id: 84,
        name: 'Cult Leader Morty',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'unknown',
          url: '',
        },
        location: {
          name: 'Hideout Planet',
          url: 'https://rickandmortyapi.com/api/location/27',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/84.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/10'],
        url: 'https://rickandmortyapi.com/api/character/84',
        created: '2017-11-30T20:41:48.080Z',
      },
      {
        id: 93,
        name: 'Diablo Verde',
        status: 'Dead',
        species: 'Mythological Creature',
        type: 'Demon',
        gender: 'Male',
        origin: {
          name: 'unknown',
          url: '',
        },
        location: {
          name: 'Dorian 5',
          url: 'https://rickandmortyapi.com/api/location/29',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/93.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/25'],
        url: 'https://rickandmortyapi.com/api/character/93',
        created: '2017-12-01T11:36:16.467Z',
      },
      {
        id: 130,
        name: 'Galactic Federation President',
        status: 'Dead',
        species: 'Alien',
        type: 'Gromflomite',
        gender: 'Male',
        origin: {
          name: 'unknown',
          url: '',
        },
        location: {
          name: 'unknown',
          url: '',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/130.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/21'],
        url: 'https://rickandmortyapi.com/api/character/130',
        created: '2017-12-26T19:49:41.160Z',
      },
      {
        id: 148,
        name: 'Goddess Beth',
        status: 'unknown',
        species: 'Mythological Creature',
        type: 'Goddess',
        gender: 'Female',
        origin: {
          name: 'Nuptia 4',
          url: 'https://rickandmortyapi.com/api/location/13',
        },
        location: {
          name: 'Nuptia 4',
          url: 'https://rickandmortyapi.com/api/location/13',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/148.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/18'],
        url: 'https://rickandmortyapi.com/api/character/148',
        created: '2017-12-29T11:40:25.135Z',
      },
      {
        id: 163,
        name: 'Ideal Jerry',
        status: 'Dead',
        species: 'Mythological Creature',
        type: 'Mytholog',
        gender: 'Male',
        origin: {
          name: 'Nuptia 4',
          url: 'https://rickandmortyapi.com/api/location/13',
        },
        location: {
          name: 'Nuptia 4',
          url: 'https://rickandmortyapi.com/api/location/13',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/163.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/18'],
        url: 'https://rickandmortyapi.com/api/character/163',
        created: '2017-12-29T16:46:41.345Z',
      },
      {
        id: 183,
        name: 'Johnny Depp',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (C-500A)',
          url: 'https://rickandmortyapi.com/api/location/23',
        },
        location: {
          name: 'Earth (C-500A)',
          url: 'https://rickandmortyapi.com/api/location/23',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/183.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/8'],
        url: 'https://rickandmortyapi.com/api/character/183',
        created: '2017-12-29T18:51:29.693Z',
      },
      {
        id: 222,
        name: 'Michael Denny and the Denny Singers',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'unknown',
          url: '',
        },
        location: {
          name: 'Interdimensional Cable',
          url: 'https://rickandmortyapi.com/api/location/6',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/222.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/8'],
        url: 'https://rickandmortyapi.com/api/character/222',
        created: '2017-12-30T14:44:05.245Z',
      },
      {
        id: 239,
        name: 'Mr. Goldenfold',
        status: 'Alive',
        species: 'Cronenberg',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (C-137)',
          url: 'https://rickandmortyapi.com/api/location/1',
        },
        location: {
          name: 'Earth (C-137)',
          url: 'https://rickandmortyapi.com/api/location/1',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/239.jpeg',
        episode: [
          'https://rickandmortyapi.com/api/episode/1',
          'https://rickandmortyapi.com/api/episode/2',
          'https://rickandmortyapi.com/api/episode/4',
          'https://rickandmortyapi.com/api/episode/6',
        ],
        url: 'https://rickandmortyapi.com/api/character/239',
        created: '2017-12-30T17:42:11.894Z',
      },
      {
        id: 240,
        name: 'Mr. Goldenfold',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (Replacement Dimension)',
          url: 'https://rickandmortyapi.com/api/location/20',
        },
        location: {
          name: 'Earth (Replacement Dimension)',
          url: 'https://rickandmortyapi.com/api/location/20',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/240.jpeg',
        episode: [
          'https://rickandmortyapi.com/api/episode/9',
          'https://rickandmortyapi.com/api/episode/16',
          'https://rickandmortyapi.com/api/episode/17',
          'https://rickandmortyapi.com/api/episode/18',
          'https://rickandmortyapi.com/api/episode/21',
          'https://rickandmortyapi.com/api/episode/22',
          'https://rickandmortyapi.com/api/episode/24',
          'https://rickandmortyapi.com/api/episode/27',
          'https://rickandmortyapi.com/api/episode/30',
          'https://rickandmortyapi.com/api/episode/39',
        ],
        url: 'https://rickandmortyapi.com/api/character/240',
        created: '2017-12-30T17:42:56.349Z',
      },
      {
        id: 269,
        name: 'Presidentress of The Mega Gargantuans',
        status: 'Alive',
        species: 'Humanoid',
        type: 'Mega Gargantuan',
        gender: 'Female',
        origin: {
          name: 'Mega Gargantuan Kingdom',
          url: 'https://rickandmortyapi.com/api/location/56',
        },
        location: {
          name: 'Mega Gargantuan Kingdom',
          url: 'https://rickandmortyapi.com/api/location/56',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/269.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/31'],
        url: 'https://rickandmortyapi.com/api/character/269',
        created: '2017-12-31T14:01:44.995Z',
      },
      {
        id: 347,
        name: 'President Curtis',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth (Replacement Dimension)',
          url: 'https://rickandmortyapi.com/api/location/20',
        },
        location: {
          name: 'Earth (Replacement Dimension)',
          url: 'https://rickandmortyapi.com/api/location/20',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/347.jpeg',
        episode: [
          'https://rickandmortyapi.com/api/episode/16',
          'https://rickandmortyapi.com/api/episode/31',
          'https://rickandmortyapi.com/api/episode/43',
          'https://rickandmortyapi.com/api/episode/45',
          'https://rickandmortyapi.com/api/episode/47',
        ],
        url: 'https://rickandmortyapi.com/api/character/347',
        created: '2018-01-10T17:43:37.411Z',
      },
      {
        id: 348,
        name: 'The President of the Miniverse',
        status: 'Dead',
        species: 'Humanoid',
        type: 'Miniverse inhabitant',
        gender: 'Male',
        origin: {
          name: "Zeep Xanflorp's Miniverse",
          url: 'https://rickandmortyapi.com/api/location/49',
        },
        location: {
          name: "Zeep Xanflorp's Miniverse",
          url: 'https://rickandmortyapi.com/api/location/49',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/348.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/17'],
        url: 'https://rickandmortyapi.com/api/character/348',
        created: '2018-01-10T17:47:59.043Z',
      },
      {
        id: 379,
        name: 'Wedding Bartender',
        status: 'unknown',
        species: 'Alien',
        type: '',
        gender: 'Male',
        origin: {
          name: 'unknown',
          url: '',
        },
        location: {
          name: 'Planet Squanch',
          url: 'https://rickandmortyapi.com/api/location/35',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/379.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/21'],
        url: 'https://rickandmortyapi.com/api/character/379',
        created: '2018-01-10T19:37:41.375Z',
      },
      {
        id: 382,
        name: 'Worldender',
        status: 'Dead',
        species: 'Alien',
        type: '',
        gender: 'Male',
        origin: {
          name: 'unknown',
          url: '',
        },
        location: {
          name: "Worldender's lair",
          url: 'https://rickandmortyapi.com/api/location/4',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/382.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/25'],
        url: 'https://rickandmortyapi.com/api/character/382',
        created: '2018-01-10T19:47:55.859Z',
      },
    ],
  };
  beforeEach(() => {
    localStorage.clear();
    cleanup();
  });
  afterEach(() => {
    vi.restoreAllMocks();
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
  it('Handles API error responses', async () => {
    fetchMock.mockResponseOnce('', { status: 404 });
    render(<RickAndMorty />);

    expect(await screen.findByRole('error')).toBeInTheDocument();
  });
});
