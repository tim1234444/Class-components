import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
type FormData = {
  id: number
  name: string;
  age: number;
  email: string;
  emailConfirm: string;
  password: string;
  passwordRepeat: string;
  gender: string;
  terms: string;
  avatar: string;
  country: string;
};


const initialState: FormData[] = []

export const FormsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<FormData>) => {
      state.push(action.payload);
    },

  },
});

export const { addForm } = FormsSlice.actions;

export default FormsSlice.reducer;
