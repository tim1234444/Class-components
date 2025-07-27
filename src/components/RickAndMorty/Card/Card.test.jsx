/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { MemoryRouter } from 'react-router';

describe('Card Component', () => {
  it('Displays item name and image when props are provided', () => {
    render(
      <MemoryRouter>
        <Card name="Rick Sanchez" image="rick.png" id={1} />
      </MemoryRouter>,
    );

    const nameElement = screen.getByTestId('description');
    const imageElement = screen.getByTestId('image');

    expect(nameElement).toBeInTheDocument();
    expect(nameElement.textContent).toBe('Rick Sanchez');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'rick.png');
    expect(imageElement).toHaveAttribute('alt', 'Rick Sanchez');
  });

  it('Handles missing image gracefully', () => {
    render(
      <MemoryRouter>
        <Card name="Morty Smith" />
      </MemoryRouter>,
    );

    const nameElement = screen.getByTestId('description');
    const imageElement = screen.queryByTestId('image');

    expect(nameElement).toBeInTheDocument();
    expect(nameElement.textContent).toBe('Morty Smith');
    expect(imageElement).not.toBeInTheDocument();
  });
});
