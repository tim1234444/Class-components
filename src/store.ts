import {
  configureStore,
  type Action,
  type ThunkAction,
} from '@reduxjs/toolkit';
import cardsSlice from './cardsReducer/cardsSlice';
import { RickAndMortyApi } from './CreateApi';

export const store = configureStore({
  reducer: {
    cards: cardsSlice,
    [RickAndMortyApi.reducerPath]: RickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(RickAndMortyApi.middleware),
});
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
