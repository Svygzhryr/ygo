import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { cardsAPI } from '../pages/api/api';
import idReducer from './reducers/IdSlice';
import itemsPerPageReducer from './reducers/ItemsPerPageSlice';
import pageReducer from './reducers/PaginationSlice';
import searchReducer from './reducers/SearchSlice';

const rootReducer = combineReducers({
  searchReducer,
  pageReducer,
  idReducer,
  itemsPerPageReducer,
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
export const wrapper = createWrapper<AppStore>(setupStore, { debug: false });
