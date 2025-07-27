import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from './NotFound';

describe('NotFound component', () => {
  it('renders 404 message', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '404 - Page Not Found',
    );
    expect(screen.getByText(/does not exist/i)).toBeInTheDocument();
  });
});
