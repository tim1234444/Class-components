import { describe, it, expect } from 'vitest';
import FormsSlice, { addForm } from './Reducer/FormsSlice';


const mockForm = {
  id: 1,
  name: 'Timofey',
  age: 20,
  email: 'test@example.com',
  emailConfirm: 'test@example.com',
  password: 'Abc123!',
  passwordRepeat: 'Abc123!',
  gender: 'male',
  terms: 'true',
  avatar: 'avatar.png',
  country: 'USA',
};

describe('FormsSlice reducer', () => {
  it('should return the initial state', () => {
    const initialState = FormsSlice(undefined, { type: 'unknown' });
    expect(initialState).toEqual([]);
  });

  it('should handle addForm', () => {
    const initialState: typeof mockForm[] = [];
    const state = FormsSlice(initialState, addForm(mockForm));
    expect(state).toHaveLength(1);
    expect(state[0]).toEqual(mockForm);
  });
});
