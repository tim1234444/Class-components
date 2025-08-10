import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import { CardList } from '../components/RickAndMorty/CardList/CardList';
import { SearchForm } from '../components/RickAndMorty/Form/Form';
import { Pagination } from '../components/RickAndMorty/Pagination/Pagination';
import { useRestoredSearchParamsFromLS } from '../hooks/useRestoreSearchParamsFromLS';
import Layout from '../components/Layout';
import {
  useFetchCharacterByIdQuery,
  useFetchCharactersByNameAndPageQuery,
} from '../CreateApi';

export function RickAndMorty() {
  const [, setSearchParams] = useSearchParams();
  const { page, id, field } = useRestoredSearchParamsFromLS();
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [shouldCrash, SetShouldCrash] = useState(false);

  const {
    data: personInfo,
    error: personError,
    isFetching: isPersonFetching,
    isLoading: isPersonLoading,
  } = useFetchCharacterByIdQuery(id, {
    skip: !id,
  });
  const {
    data: listInfo,
    error: listError,
    isFetching: isListLoading,
    refetch,
  } = useFetchCharactersByNameAndPageQuery({ name: field, page: page });

  useEffect(() => {
    if (
      (isPersonFetching && !isDetailVisible && id !== '') ||
      (!isPersonFetching && !isPersonLoading && !isDetailVisible && id !== '')
    ) {
      setIsDetailVisible(true);
    }
  }, [id]);

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
          data={
            listInfo ?? {
              info: { count: -1, pages: -1 },
              results: [],
            }
          }
        ></CardList>

        <Outlet
          context={{
            isPersonFetching,
            personInfo,
            isDetailVisible,
            closeDetail: () => {
              localStorage.setItem('id', '');
              setSearchParams({});
              setIsDetailVisible(false);
            },
            personError,
          }}
        />
      </div>

      <Pagination
        closeDetail={() => setIsDetailVisible(false)}
        PageNumber={listInfo?.info?.pages ?? -1}
      ></Pagination>
      <button className="error-button" onClick={() => SetShouldCrash(true)}>
        Вызвать ошибку
      </button>
      <button
        onClick={() => {
          refetch();
        }}
        className="refresh-btn"
      >
        new request
      </button>
    </Layout>
  );
}
