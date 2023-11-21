import '@testing-library/jest-dom';

import { server } from '../mocks/api/server';
import { cardsAPI } from '../pages/api/RequestService';
import { setupStore } from '../store/store';

const store = setupStore({});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(cardsAPI.util.resetApiState());
});

afterAll(() => server.close());
