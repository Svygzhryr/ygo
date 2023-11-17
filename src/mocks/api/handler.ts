import { http } from 'msw';

import { baseUrl } from '../../services/RequestService';
import { cardList } from '../mockedData';

export const handlers = [
  http.get(baseUrl, () => {
    return new Response(JSON.stringify(cardList));
  }),
];
