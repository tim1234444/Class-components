'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CardList } from '../components/RickAndMorty/CardList/CardList';
import { SearchForm } from '../components/RickAndMorty/Form/Form';
import { Pagination } from '../components/RickAndMorty/Pagination/Pagination';
import { useRestoredSearchParamsFromLS } from '../hooks/useRestoreSearchParamsFromLS';
import {
  useFetchCharacterByIdQuery,
  useFetchCharactersByNameAndPageQuery,
} from '../CreateApi';
import { Detail } from '../components/RickAndMorty/Detail/Detail';
import { useTranslations } from 'next-intl';

export function RickAndMorty() {
  const t = useTranslations('HomePage');

  const pathname = usePathname();

  const { replace } = useRouter();
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
    <>
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

        <Detail
          isPersonFetching={isPersonFetching}
          personInfo={personInfo}
          isDetailVisible={isDetailVisible}
          closeDetail={() => {
            localStorage.setItem('id', '');
            replace(`${pathname}`);
            setIsDetailVisible(false);
          }}
          personError={personError}
        ></Detail>
      </div>

      <Pagination
        closeDetail={() => setIsDetailVisible(false)}
        PageNumber={listInfo?.info?.pages ?? -1}
      ></Pagination>
      <button className="error-button" onClick={() => SetShouldCrash(true)}>
        {t('Error')}
      </button>
      <button
        onClick={() => {
          refetch();
        }}
        className="refresh-btn"
      >
        {t('Request')}
      </button>
    </>
  );
}
