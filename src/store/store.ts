import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';

import { cardsAPI } from '../services/RequestService';
import idReducer from './reducers/IdSlice';
import itemsPerPageReducer from './reducers/ItemsPerPageSlice';
import pageReducer from './reducers/PaginationSlice';
import searchReducer from './reducers/SearchSlice';
import storedIsLoadingReducer from './reducers/storedIsLoadingSlice';

const rootReducer = combineReducers({
  searchReducer,
  pageReducer,
  idReducer,
  itemsPerPageReducer,
  storedIsLoadingReducer,
  [cardsAPI.reducerPath]: cardsAPI.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardsAPI.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
