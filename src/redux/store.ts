import { combineReducers, configureStore } from '@reduxjs/toolkit';
import controlledReducer from './reducers/controlledSlice';
import uncontrolledReducer from './reducers/uncontrolledSlice';
import notificationReducer from './reducers/notificationSlice';

const rootReducer = combineReducers({
  controlledReducer,
  uncontrolledReducer,
  notificationReducer,
});

export const setupStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof setupStore.dispatch;
