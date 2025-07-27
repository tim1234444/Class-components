import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import { vi } from 'vitest';
import * as ReactRouter from 'react-router';

describe('Pagination component', () => {
  const setSearchParamsMock = vi.fn();

  beforeEach(() => {
    setSearchParamsMock.mockClear();
    vi.spyOn(ReactRouter, 'useSearchParams').mockReturnValue([
      {
        get: (key: string) => {
          if (key === 'page') return '1';
          return null;
        },
      } as URLSearchParams,
      setSearchParamsMock,
    ]);
  });

  it('renders correct page buttons for first page', () => {
    render(<Pagination closeDetail={vi.fn()} PageNumber={5} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    expect(screen.getByText('1')).toHaveClass('pagination__button--active');
  });

  it('calls closeDetail and updates page on button click', () => {
    const closeDetail = vi.fn();

    // Переопределяем mock для currentPage=2
    vi.spyOn(ReactRouter, 'useSearchParams').mockReturnValue([
      {
        get: (key: string) => (key === 'page' ? '2' : null),
      } as URLSearchParams,
      setSearchParamsMock,
    ]);

    render(<Pagination closeDetail={closeDetail} PageNumber={3} />);

    const button = screen.getByText('3');
    fireEvent.click(button);

    expect(closeDetail).toHaveBeenCalled();
    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: '3' });
    expect(localStorage.getItem('page')).toBe('3');
  });
});
