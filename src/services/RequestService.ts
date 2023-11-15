import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

import { ICard, ICardAPI } from '../types/types';

interface IQueryParams {
  num?: number;
  offset?: number;
}

const baseUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

export const cardsAPI = createApi({
  reducerPath: 'cardsAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    fetchAllCards: build.query<ICardAPI, IQueryParams>({
      query: ({ num, offset } = { num: 12, offset: 0 }) => ({
        url: '/',
        params: { num, offset },
      }),
    }),
  }),
});

export const getCards = async (limit = 12, offset = 0, search = '') => {
  const data = {
    data: [],
    meta: null,
  } as ICardAPI;

  try {
    const response = await axios.get<ICardAPI>(`${baseUrl}`, {
      params: {
        num: limit,
        offset,
        fname: search,
      },
    });

    data.data = response.data.data;
    data.meta = response.data.meta;
  } catch (err) {
    console.error(err);
  }
  return { data };
};

export const getCard = async (id: string) => {
  const data = {
    data: [],
    meta: null,
  } as ICardAPI;

  try {
    const response = await axios.get<ICardAPI>(`${baseUrl}`, {
      params: {
        id,
      },
    });

    data.data = response.data.data;
  } catch (err) {
    console.error(err);
  }
  return { data };
};
