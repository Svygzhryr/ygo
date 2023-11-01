import axios from 'axios';

import { ICardAPI } from '../types/types';

const API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

export const getCards = async (limit = 12, offset = 0, search = '') => {
  const data = {
    data: [],
    meta: null,
  } as ICardAPI;

  try {
    const response = await axios.get<ICardAPI>(`${API_URL}`, {
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
    const response = await axios.get<ICardAPI>(`${API_URL}`, {
      params: {
        id,
      },
    });

    data.data = response.data.data;
    data.meta = response.data.meta;
  } catch (err) {
    console.error(err);
  }
  return { data };
};
