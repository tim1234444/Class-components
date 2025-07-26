import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import { CardList } from '../components/RickAndMorty/CardList/CardList';
import { SearchForm } from '../components/RickAndMorty/Form/Form';
import { Pagination } from '../components/RickAndMorty/Pagination/Pagination';
import type {
  FetchListData,
  FetchPersonData,
  GetPersonsParams,
} from '../type/type';
import { FetchContext } from '../context/context';

export function RickAndMorty() {
  const [searchParams] = useSearchParams();

  const [personInfo, SetPersonInfo] = useState<FetchPersonData>();
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isPersonLoading, setIsPersonLoading] = useState<boolean>(false);
  const [personError, SetPersonError] = useState<string>('');

  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [listInfo, SetListInfo] = useState<FetchListData>({
    info: { count: -1, pages: -1 },
    results: [],
  });
  const [listError, SetListError] = useState<string>('');

  const [shouldCrash, SetShouldCrash] = useState<boolean>(false);

  async function fetchCharacterById(id: number) {
    setIsDetailVisible(true);
    setIsPersonLoading(true);

    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`,
      );

      if (res.status === 404) {
        SetPersonError('Character not found');
      } else if (res.status !== 200) {
        throw new Error('Sorry, Error');
      } else {
        const data = await res.json();
        SetPersonInfo(data);

        SetPersonError('');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        SetPersonError(err.message);
        console.error('Fetch error:', err);
      }
    } finally {
      setIsPersonLoading(false);
    }
  }

  async function fetchCharactersByQuery({ page, name }: GetPersonsParams) {
    setIsListLoading(true);

    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`,
      );

      if (res.status === 404) {
        SetListInfo({ info: { count: -1, pages: -1 }, results: [] });
        SetListError('');
      } else if (res.status !== 200) {
        throw new Error('Sorry, Error');
      } else {
        const data = await res.json();
        SetListInfo(data);
        SetListError('');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        SetListError(err.message);
        console.error('Fetch error:', err);
      }
    } finally {
      setIsListLoading(false);
    }
  }

  function handleFetchCharacters({ page, name, id }: GetPersonsParams) {
    if (id) {
      fetchCharacterById(id);
    } else {
      fetchCharactersByQuery({ name, page });
    }
  }

  useEffect(() => {
    console.log(searchParams.get('page'));
    const page = searchParams.get('page') || '1';
    const personId = searchParams.get('id');

    handleFetchCharacters({
      page: page,
      name: localStorage.getItem('field') || '',
    });
    if (personId) {
      handleFetchCharacters({
        id: +personId,
      });
    }
  }, [searchParams.get('page')]);

  if (shouldCrash) {
    throw new Error('Тестовая ошибка в render()');
  }
  return (
    <>
      <header className="header">
        <SearchForm ClickButton={handleFetchCharacters}></SearchForm>
      </header>
      <main>
        <div className="content-container">
          <FetchContext value={handleFetchCharacters}>
            <CardList
              error={listError}
              isLoad={isListLoading}
              data={listInfo}
            ></CardList>
          </FetchContext>
          <Outlet
            context={{
              isPersonLoading,
              personInfo,
              isDetailVisible,
              closeDetail: () => setIsDetailVisible(false),
              personError,
            }}
          />
        </div>

        <Pagination
          closeDetail={() => setIsDetailVisible(false)}
          PageNumber={listInfo.info.pages}
        ></Pagination>
        <button className="error-button" onClick={() => SetShouldCrash(true)}>
          Вызвать ошибку
        </button>
      </main>
      <footer></footer>
    </>
  );
}
