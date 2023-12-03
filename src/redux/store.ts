import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import controlledReducer from './reducers/ControlledSlice';
import uncontrolledReducer from './reducers/UncontrolledSlice';
import notificationReducer from './reducers/NotificationSlice';

const rootReducer = combineReducers({
  controlledReducer,
  uncontrolledReducer,
  notificationReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
