import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import FormsSlice from "../../Reducer/FormsSlice";
import UncontrolledForm from "./UncontrolledForm";
import { ModalContext } from "../Modal/Modal";
import { checkPasswordStrength } from "../../utils/password";

const renderWithStore = (
  ui: React.ReactNode,
  { countries = ["USA", "Germany"] } = {}
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
        <ModalContext value={close}>{ui}</ModalContext>
      </Provider>
    ),
  };
};

describe("UncontrolledForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders all required fields", () => {
    renderWithStore(<UncontrolledForm />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: /Age/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Repeat Password/i)).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText(/Female/i)).toBeInTheDocument();
    expect(screen.getByText(/Other/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/I accept Terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload Image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
  });

  it("validates required fields and shows errors", async () => {
    renderWithStore(<UncontrolledForm />);
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/Name is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Age is required/i)
    ).toBeInTheDocument();
  });

  it("calculates password strength correctly", () => {
    expect(checkPasswordStrength("123")).toBe("Very Weak");
    expect(checkPasswordStrength("abc")).toBe("Very Weak");
    expect(checkPasswordStrength("abc1")).toBe("Weak");
    expect(checkPasswordStrength("Abc1")).toBe("Medium");
    expect(checkPasswordStrength("Abc1!")).toBe("Strong");
  });

  it("updates password strength message on typing", async () => {
    renderWithStore(<UncontrolledForm />);
    const passwordInput = screen.getByLabelText(/^Password$/i);

    fireEvent.change(passwordInput, { target: { value: "abc" } });
    expect(
      await screen.findByText(/Password strength:\s*Very Weak/i)
    ).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: "Abc1!" } });
    expect(
      await screen.findByText(/Password strength:\s*Strong/i)
    ).toBeInTheDocument();
  });

  

  it("shows and clears errors properly", async () => {
    renderWithStore(<UncontrolledForm />);

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/Name is required/i)
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Timofey" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.queryByText(/Name is required/i)
      ).not.toBeInTheDocument();
    });
  });
});
