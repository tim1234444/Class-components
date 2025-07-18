/// <reference types="vitest/globals" />
import { render, fireEvent, cleanup } from '@testing-library/react';

import { SearchForm } from './Form';

describe('SearchForm', () => {
  const mockClickButton = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    cleanup();
    mockClickButton.mockClear();
  });

  it('render input and button', () => {
    const { getByRole } = render(<SearchForm ClickButton={mockClickButton} />);
    const input = getByRole('textbox') as HTMLInputElement;
    const button = getByRole('button') as HTMLButtonElement;
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Shows empty input when no saved term exists', () => {
    const { getByRole } = render(<SearchForm ClickButton={mockClickButton} />);
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  it('renders input with default value from localStorage', () => {
    localStorage.setItem('field', 'default value');

    const { getByRole } = render(<SearchForm ClickButton={mockClickButton} />);
    const input = getByRole('textbox') as HTMLInputElement;

    expect(input.value).toBe('default value');
  });

  it('updates value on change', () => {
    const { getByRole } = render(<SearchForm ClickButton={mockClickButton} />);
    const input = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test input' } });
    expect(input.value).toBe('test input');
  });

  it('calls ClickButton on form submit', async () => {
    const { getByRole } = render(<SearchForm ClickButton={mockClickButton} />);
    const input = getByRole('textbox') as HTMLInputElement;
    const button = getByRole('button');

    fireEvent.change(input, { target: { value: 'search term' } });
    fireEvent.click(button);

    expect(mockClickButton).toHaveBeenCalledWith(
      'search term',
      expect.any(Object),
    );
  });

  it('Overwrites the existing localStorage value', async () => {
    const mockClickButton = vi.fn().mockImplementation((name) => {
      localStorage.setItem('field', name);
    });
    const { getByRole } = render(<SearchForm ClickButton={mockClickButton} />);
    const input = getByRole('textbox') as HTMLInputElement;
    const button = getByRole('button');

    fireEvent.change(input, { target: { value: 'search term' } });
    fireEvent.click(button);

    expect(localStorage.getItem('field')).toBe('search term');
  });

  it('triggers ClickButton with correct parameters on submit', () => {
    const { getByRole } = render(<SearchForm ClickButton={mockClickButton} />);

    const input = getByRole('textbox') as HTMLInputElement;
    const button = getByRole('button') as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'Rick Sanchez' } });

    fireEvent.click(button);

    expect(mockClickButton).toHaveBeenCalledTimes(1);
    expect(mockClickButton).toHaveBeenCalledWith(
      'Rick Sanchez',
      expect.any(Object),
    );
  });
});
