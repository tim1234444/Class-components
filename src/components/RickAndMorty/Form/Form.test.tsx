/// <reference types="vitest/globals" />
import { render, fireEvent, cleanup, screen } from '@testing-library/react';

import { SearchForm } from './Form';
import { MemoryRouter } from 'react-router';

describe('SearchForm', () => {
  const mockClickButton = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    cleanup();
    mockClickButton.mockClear();
  });

  it('render input and button', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>,
    );
    expect(mockClickButton).toBeCalled();
    const input = getByRole('textbox') as HTMLInputElement;
    const button = getByRole('button') as HTMLButtonElement;
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Shows empty input when no saved term exists', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>,
    );
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  it('renders input with default value from localStorage', () => {
    localStorage.setItem('field', 'default value');

    render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>,
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input.value).toBe('default value');
  });

  it('updates value on change', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>,
    );
    const input = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test input' } });
    expect(input.value).toBe('test input');
  });
});
