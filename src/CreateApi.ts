import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from './constants';
import type { FetchListData, FetchPersonData } from './type/type';

export const RickAndMortyApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (build) => ({
    fetchCharactersByNameAndPage: build.query<
      FetchListData,
      Record<string, string>
    >({
      query: (info) => ({
        url: '',
        params: info,
      }),
    }),
    fetchCharacterById: build.query<FetchPersonData, string>({
      query: (id) => ({
        url: `${id}`,
      }),
    }),
  }),
});
export const {
  useFetchCharactersByNameAndPageQuery,
  useFetchCharacterByIdQuery,
} = RickAndMortyApi;
