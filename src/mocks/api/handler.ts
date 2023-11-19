import { HttpResponse, http } from 'msw';

import { baseUrl } from '../../services/RequestService';
import { cardList } from '../mockedData';

export const handlers = [
  http.get('*', () => {
    return HttpResponse.json(cardList);
  }),
];
