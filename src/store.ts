import {
    configureStore,
    type Action,
    type ThunkAction,
  } from '@reduxjs/toolkit';
import FormsSlice from './Reducer/FormsSlice';
import countriesSlice from './Reducer/CountriesSlice';

  
  export const store = configureStore({
    reducer: {
      forms: FormsSlice,
      countries: countriesSlice,
    
    },
   
  });
  export type AppStore = typeof store;
  export type RootState = ReturnType<AppStore['getState']>;

  export type AppDispatch = AppStore['dispatch'];

  export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
  >;

