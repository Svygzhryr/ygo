import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { cardsAPI } from '../services/RequestService';
import pageReducer from './reducers/PaginationSlice';
import searchReducer from './reducers/SearchSlice';

const rootReducer = combineReducers({
  searchReducer,
  pageReducer,
  [cardsAPI.reducerPath]: cardsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];