import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { CardList } from '../components/RickAndMorty/CardList/CardList';
import { SearchForm } from '../components/RickAndMorty/Form/Form';
import { Pagination } from '../components/RickAndMorty/Pagination/Pagination';
import type {
  FetchListData,
  FetchPersonData,
  GetPersonsParams,
} from '../type/type';
import { useRestoredSearchParamsFromLS } from '../hooks/useRestoreSearchParamsFromLS';
import Layout from '../components/Layout';
import { BASE_API_URL } from '../constants';

export function RickAndMorty() {
  const { page, id, field } = useRestoredSearchParamsFromLS();

  const [personInfo, SetPersonInfo] = useState<FetchPersonData>();
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isPersonLoading, setIsPersonLoading] = useState(false);
  const [personError, SetPersonError] = useState('');

  const [isListLoading, setIsListLoading] = useState(false);
  const [listInfo, SetListInfo] = useState<FetchListData>({
    info: { count: -1, pages: -1 },
    results: [],
  });
  const [listError, SetListError] = useState('');

  const [shouldCrash, SetShouldCrash] = useState(false);

  async function fetchCharacterById(id: number) {
    setIsDetailVisible(true);
    setIsPersonLoading(true);

    try {
      const res = await fetch(`${BASE_API_URL}${id}`);

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
      const res = await fetch(`${BASE_API_URL}?name=${name}&page=${page}`);

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
    }
    if ((page && name) || (name === '' && page)) {
      fetchCharactersByQuery({ name, page });
    }
  }

  useEffect(() => {
    if (id) {
      handleFetchCharacters({
        id: +id,
      });
    }
  }, [id]);
  useEffect(() => {
    handleFetchCharacters({
      page: page,
      name: field,
    });
  }, [page, field]);

  if (shouldCrash) {
    throw new Error('Тестовая ошибка в render()');
  }
  return (
    <Layout>
      <SearchForm />
      <div className="content-container">
        <CardList
          error={listError}
          isLoad={isListLoading}
          data={listInfo}
        ></CardList>

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
    </Layout>
  );
}
