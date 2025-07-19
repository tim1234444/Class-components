/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  it('Displays item name and image when props are provided', () => {
    render(<Card name="Rick Sanchez" image="rick.png" />);

    const nameElement = screen.getByTestId('description');
    const imageElement = screen.getByTestId('image');

    expect(nameElement).toBeInTheDocument();
    expect(nameElement.textContent).toBe('Rick Sanchez');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'rick.png');
    expect(imageElement).toHaveAttribute('alt', 'Rick Sanchez');
  });

  it('Handles missing image gracefully', () => {
    render(<Card name="Morty Smith" />);

    const nameElement = screen.getByTestId('description');
    const imageElement = screen.queryByTestId('image');

    expect(nameElement).toBeInTheDocument();
    expect(nameElement.textContent).toBe('Morty Smith');
    expect(imageElement).not.toBeInTheDocument();
  });
});
