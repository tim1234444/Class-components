/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import type { FetchPersonData } from '../../../type/type';
describe('Card Component', () => {
  it('Displays item name and image when props are provided', () => {
    const mockCharacter: FetchPersonData = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '123' },
      location: { name: 'Citadel of Ricks', url: '123' },
      episode: ['ep1', 'ep2'],
      image: 'https://rick.com/image.jpg',
      created: '2023-01-01T00:00:00.000Z',
      url: '123',
    };
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card initChecked={false} item={mockCharacter} />
        </Provider>
      </MemoryRouter>,
    );

    const nameElement = screen.getByTestId('description');
    const imageElement = screen.getByTestId('image');

    expect(nameElement).toBeInTheDocument();
    expect(nameElement.textContent).toBe('Rick Sanchez');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'https://rick.com/image.jpg');
    expect(imageElement).toHaveAttribute('alt', 'Rick Sanchez');
  });

  it('Handles missing image gracefully', () => {
    const mockCharacter: FetchPersonData = {
      id: 1,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '123' },
      location: { name: 'Citadel of Ricks', url: '123' },
      episode: ['ep1', 'ep2'],
      image: '',
      created: '2023-01-01T00:00:00.000Z',
      url: '123',
    };
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card initChecked={false} item={mockCharacter} />
        </Provider>
      </MemoryRouter>,
    );

    const nameElement = screen.getByTestId('description');
    const imageElement = screen.queryByTestId('image');

    expect(nameElement).toBeInTheDocument();
    expect(nameElement.textContent).toBe('Morty Smith');
    expect(imageElement).not.toBeInTheDocument();
  });
});
