/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';
import { mockedData } from '../../../__test__/mockedData';
describe('CardList', () => {
  it('Renders correct number of items when data is provided', () => {
    const { getAllByTestId } = render(
      <CardList isLoad={false} error="" data={mockedData} />,
    );

    const cards = getAllByTestId('card');
    expect(cards.length).toBe(20);
  });

  it('Displays "no results" message when data array is empty', () => {
    render(
      <CardList isLoad={false} error="" data={{ results: [] }}></CardList>,
    );
    const errorElement = screen.getByText('There is nothing here');
    const list = screen.queryByRole('list');
    expect(errorElement).toBeInTheDocument();
    expect(list).not.toBeInTheDocument();
  });

  it('Shows loading state while fetching data', () => {
    render(<CardList isLoad={true} error="" data={{ results: [] }}></CardList>);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('Correctly displays item names and descriptions', () => {
    const { getAllByTestId } = render(
      <CardList isLoad={false} error="" data={mockedData} />,
    );

    const names = getAllByTestId('description');
    const images = getAllByTestId('image');
    expect(names.length).toBe(20);
    expect(images.length).toBe(20);
  });

  it('Displays error message when API call fails', () => {
    render(
      <CardList isLoad={false} error="Failed to fetch" data={mockedData} />,
    );

    const errorElement = screen.getByText('Failed to fetch');
    const list = screen.queryByRole('list');
    expect(errorElement).toBeInTheDocument();
    expect(list).not.toBeInTheDocument();
  });
});
