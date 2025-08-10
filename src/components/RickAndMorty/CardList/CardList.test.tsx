/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';
import { mockedData } from '../../../__test__/mockedData';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../../store';
describe('CardList', () => {
  it('Renders correct number of items when data is provided', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <Provider store={store}>
          <CardList isLoad={false} error="" data={mockedData} />
        </Provider>
      </MemoryRouter>,
    );

    const cards = getAllByTestId('card');
    expect(cards.length).toBe(20);
  });

  it('Displays "no results" message when data array is empty', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardList
            isLoad={false}
            error={{ status: 404 }}
            data={{ info: { count: -1, pages: -1 }, results: [] }}
          ></CardList>
        </Provider>
      </MemoryRouter>,
    );
    const errorElement = screen.getByText('Nothing found');
    const list = screen.queryByRole('list');
    expect(errorElement).toBeInTheDocument();
    expect(list).not.toBeInTheDocument();
  });

  it('Shows loading state while fetching data', () => {
    render(
      <Provider store={store}>
        <CardList
          isLoad={true}
          error=""
          data={{ info: { count: -1, pages: -1 }, results: [] }}
        ></CardList>
      </Provider>,
    );
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('Correctly displays item names and descriptions', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <Provider store={store}>
          <CardList isLoad={false} error="" data={mockedData} />
        </Provider>
      </MemoryRouter>,
    );

    const names = getAllByTestId('description');
    const images = getAllByTestId('image');
    expect(names.length).toBe(20);
    expect(images.length).toBe(20);
  });

  it('Displays error message when API call fails', () => {
    render(
      <Provider store={store}>
        <CardList
          isLoad={false}
          error={{ status: 'FETCH_ERROR' }}
          data={mockedData}
        />
      </Provider>,
    );

    const errorElement = screen.getByText('Ошибка: FETCH_ERROR');
    const list = screen.queryByRole('list');
    expect(errorElement).toBeInTheDocument();
    expect(list).not.toBeInTheDocument();
  });
});
