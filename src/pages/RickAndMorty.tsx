import { useEffect, useState } from 'react';

import { CardList } from '../components/RickAndMorty/CardList/CardList';
import { SearchForm } from '../components/RickAndMorty/Form/Form';
import { Pagination } from '../components/RickAndMorty/Pagination/Pagination';

type CardType = {
  name: string;
  image?: string;
};
type FetchData = {
  info: {
    count: number;
    pages: number;
  };
  results: CardType[];
};
export function RickAndMorty() {
  const [info, SetInfo] = useState<FetchData>({
    info: { count: -1, pages: -1 },
    results: [],
  });
  const [isLoad, SetIsLoad] = useState<boolean>(false);
  const [error, SetError] = useState<string>('');
  const [shouldCrash, SetShouldCrash] = useState<boolean>(false);

  async function GetPersons(
    page: string,
    name: string,
    e?: React.FormEvent<HTMLFormElement>,
  ) {
    SetIsLoad(true);
    if (e) {
      e.preventDefault();
    }

    localStorage.setItem('field', name);
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`,
      );

      if (res.status == 404) {
        SetIsLoad(false);
        SetError('');
        SetInfo({ info: { count: -1, pages: -1 }, results: [] });
      } else if (res.status != 200) {
        throw new Error('Sorry, Error');
      } else if (res.status == 200) {
        const data = await res.json();
        SetIsLoad(false);
        SetError('');
        SetInfo(data);
        console.log(data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        SetIsLoad(false);
        SetError(err.message);
        console.error('Fetch error:', err);
      }
    }
  }
  useEffect(() => {
    GetPersons('1', localStorage.getItem('field') || '');
  }, []);

  if (shouldCrash) {
    throw new Error('Тестовая ошибка в render()');
  }
  return (
    <>
      <header className="header">
        <SearchForm ClickButton={GetPersons}></SearchForm>
      </header>
      <main>
        <CardList error={error} isLoad={isLoad} data={info}></CardList>
        <Pagination
          onClick={GetPersons}
          PageNumber={info.info.pages}
        ></Pagination>
        <button className="error-button" onClick={() => SetShouldCrash(true)}>
          Вызвать ошибку
        </button>
      </main>
      <footer></footer>
    </>
  );
}
