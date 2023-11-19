import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ICardAPI } from '../types/types';

interface IQueryParams {
  num?: number;
  offset?: number;
  fname?: string;
}

export const baseUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php/';

export const cardsAPI = createApi({
  reducerPath: 'cardsAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    fetchAllCards: build.query<ICardAPI, IQueryParams>({
      query: ({ num = 12, offset = 0, fname = '' }) => ({
        url: `/`,
        params: { num, offset, fname },
      }),
    }),
    fetchCardById: build.query<ICardAPI, string>({
      query: (id) => ({
        url: `?id=${id}`,
      }),
    }),
  }),
});

export const { useFetchAllCardsQuery, useFetchCardByIdQuery } = cardsAPI;
