import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ControlledForm from './ControlledForm';
import FormsSlice from '../../Reducer/FormsSlice';
import { ModalContext } from '../Modal/Modal';

const renderWithStore = (
  ui: React.ReactNode,
  { countries = ['USA', 'Germany'] } = {},
) => {
  const store = configureStore({
    reducer: {
      forms: FormsSlice,
      countries: () => ({ countries }),
    },
  });

  const close = vi.fn();

  return {
    store,
    close,
    ...render(
      <Provider store={store}>
        <ModalContext.Provider value={close}>{ui}</ModalContext.Provider>
      </Provider>,
    ),
  };
};

describe('ControlledForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renders all required fields', () => {
    renderWithStore(<ControlledForm />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: /Age/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Repeat Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Male')).toBeInTheDocument();
    expect(screen.getByLabelText('Female')).toBeInTheDocument();
    expect(screen.getByLabelText('Other')).toBeInTheDocument();
    expect(screen.getByLabelText(/I accept Terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload Image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    renderWithStore(<ControlledForm />);
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Timofey' },
    });
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: '' },
    });
    expect(await screen.findByText(/First letter must be uppercase/i)).toBeInTheDocument();
  });

 

  it('updates password strength dynamically', async () => {
    renderWithStore(<ControlledForm />);
    const passwordInput = screen.getByLabelText(/^Password$/i);

    fireEvent.change(passwordInput, { target: { value: 'abc' } });
    expect(
      await screen.findByText(/Password strength: Very Weak/i),
    ).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'Abc1!' } });
    expect(
      await screen.findByText(/Password strength: Strong/i),
    ).toBeInTheDocument();
  });
});
