/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('Renders loading indicator', () => {
    render(<Spinner />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
