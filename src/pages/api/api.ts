import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { ICardAPI } from 'src/types/types';

interface IQueryParams {
  num?: number;
  offset?: number;
  fname?: string;
}

export const baseUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php/';

export const cardsAPI = createApi({
  reducerPath: 'cardsAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    fetchAllCards: build.query<ICardAPI, IQueryParams>({
      query: ({ num = 12, offset = 0, fname = '' }) => ({
        url: `/`,
        params: { num, offset, fname },
      }),
    }),
    fetchCardById: build.query<ICardAPI, string>({
      query: (id) => ({
        url: `?id=${id || 34541863}`,
      }),
    }),
  }),
});

export const {
  useFetchAllCardsQuery,
  useFetchCardByIdQuery,
  util: { getRunningQueriesThunk },
} = cardsAPI;
export const { fetchAllCards, fetchCardById } = cardsAPI.endpoints;
