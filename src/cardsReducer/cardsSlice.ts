import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FetchPersonData } from '../type/type';

const initialState: FetchPersonData[] = [];

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    push: (state, action: PayloadAction<FetchPersonData>) => {
      state.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});
export default cardsSlice.reducer;
export const { push, remove } = cardsSlice.actions;
