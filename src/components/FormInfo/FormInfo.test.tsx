import { describe, it, expect, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import FormInfo from './FormInfo';

const mockInfo = {
  name: 'Timofey',
  age: 25,
  email: 'test@example.com',
  emailConfirm: 'test@example.com',
  password: 'Abc123!',
  passwordRepeat: 'Abc123!',
  gender: 'male',
  terms: 'true',
  avatar: 'avatar.png',
  country: 'USA',
};

describe('FormInfo component', () => {
  it('renders all user info correctly', () => {
    render(<FormInfo Info={mockInfo} />);

    expect(screen.getByText(mockInfo.name)).toBeInTheDocument();
    expect(screen.getByText(String(mockInfo.age))).toBeInTheDocument();
    expect(screen.getByText(mockInfo.country)).toBeInTheDocument();
    expect(screen.getByText(mockInfo.email)).toBeInTheDocument();
    expect(screen.getByText(mockInfo.gender)).toBeInTheDocument();
    expect(screen.getByText(mockInfo.password)).toBeInTheDocument();
    expect(screen.getByText('accept')).toBeInTheDocument();
    expect(screen.getByAltText('preview')).toHaveAttribute(
      'src',
      mockInfo.avatar,
    );
  });

  it('applies effect class when isNew is true', () => {
    vi.useFakeTimers();

    render(<FormInfo Info={mockInfo} isNew />);

    const card = screen.getByText(mockInfo.name).closest('.form-info__card');
    expect(card).toHaveClass('effect');

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(card).not.toHaveClass('effect');

    vi.useRealTimers();
  });

  it('does not apply effect class when isNew is false', () => {
    render(<FormInfo Info={mockInfo} isNew={false} />);

    const card = screen.getByText(mockInfo.name).closest('.form-info__card');
    expect(card).not.toHaveClass('effect');
  });

  it('shows "No accept" if terms is false', () => {
    const info = { ...mockInfo, terms: '' };
    render(<FormInfo Info={info} />);

    expect(screen.getByText('No accept')).toBeInTheDocument();
  });
});
