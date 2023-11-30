import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import controlledReducer from './reducers/ControlledSlice';
import uncontrolledReducer from './reducers/UncontrolledSlice';

const rootReducer = combineReducers({ controlledReducer, uncontrolledReducer });

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
