export type CardType = {
  name: string;
  image?: string;
  id: number;
};
export type FetchListData = {
  info: {
    count: number;
    pages: number;
  };
  results: FetchPersonData[];
};
export type FetchPersonData = {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Male' | 'Female' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};
export type GetPersonsParams = {
  page?: string;
  name?: string;
  id?: number;
};

export type FetchFunction = ({ page, name, id }: GetPersonsParams) => void;
