import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Detail } from './Detail';
import * as ReactRouter from 'react-router';

const mockedUseOutletContext = vi
  .spyOn(ReactRouter, 'useOutletContext')
  .mockImplementation(() => {});

describe('Detail component', () => {
  it('does not render if isDetailVisible is false', () => {
    mockedUseOutletContext.mockReturnValue({
      isDetailVisible: false,
    });

    const { container } = render(<Detail />);
    expect(container.firstChild).toBeNull();
  });

  it('shows error message if personError exists and is not loading', () => {
    mockedUseOutletContext.mockReturnValue({
      isDetailVisible: true,
      personError: 'Something went wrong',
      isPersonLoading: false,
    });

    render(<Detail />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows spinner when loading', () => {
    mockedUseOutletContext.mockReturnValue({
      isDetailVisible: true,
      personError: '',
      isPersonLoading: true,
    });

    render(<Detail />);
    expect(screen.getByTestId('loader')).toBeInTheDocument(); // предполагается, что у Spinner стоит role="status"
  });

  it('renders character details when data is available', () => {
    mockedUseOutletContext.mockReturnValue({
      isDetailVisible: true,
      personError: '',
      isPersonLoading: false,
      closeDetail: vi.fn(),
      personInfo: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth (C-127)' },
        location: { name: 'Citadel of Ricks' },
        episode: ['ep1', 'ep2', 'ep3'],
        image: 'https://rick.com/image.jpg',
        created: '2024-01-01T00:00:00.000Z',
      },
    });

    render(<Detail />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText(/Alive/)).toBeInTheDocument();
    expect(screen.getByText(/Human/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute(
      'src',
      'https://rick.com/image.jpg',
    );
  });

  it('calls closeDetail when close button is clicked', () => {
    const closeFn = vi.fn();

    mockedUseOutletContext.mockReturnValue({
      isDetailVisible: true,
      personError: '',
      isPersonLoading: false,
      closeDetail: closeFn,
      personInfo: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth (C-137)' },
        location: { name: 'Citadel of Ricks' },
        episode: [],
        image: 'https://rick.com/image.jpg',
        created: '2023-01-01T00:00:00.000Z',
      },
    });

    render(<Detail />);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(closeFn).toHaveBeenCalled();
  });
});
