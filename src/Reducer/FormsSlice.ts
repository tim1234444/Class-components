import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
type FormDataType = {
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
export const FormsSlice = createSlice({
  name: 'forms',
  initialState: {
    UncontrolledForm: {},
    ControlledForm: {},
  },
  reducers: {
    SaveUncontrolledForm: (state, action: PayloadAction<FormDataType>) => {
      state.UncontrolledForm = action.payload;
    },
  },
});

export const { SaveUncontrolledForm } = FormsSlice.actions;

export default FormsSlice.reducer;
