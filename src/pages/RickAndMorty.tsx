import { Component } from 'react';

import { CardList } from '../components/RickAndMorty/CardList/CardList';
import { SearchForm } from '../components/RickAndMorty/Form/Form';

export class RickAndMorty extends Component {
  state = {
    info: {
      results: [],
    },
    isLoad: false,
    error: '',
    shouldCrash: false,
  };
  GetPersons = async (name: string, e?: React.FormEvent<HTMLFormElement>) => {
    this.setState({ isLoad: true });
    if (e) {
      e.preventDefault();
    }

    localStorage.setItem('field', name);
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}`,
      );
      const data = await res.json();

      if (res.status == 404) {
        this.setState({ info: { results: [] }, isLoad: false, error: '' });
      } else if (res.status != 200) {
        throw new Error('Sorry, Error');
      } else if (res.status == 200) {
        this.setState({ info: data, isLoad: false, error: '' });
      }

      console.log(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.setState({ isLoad: false, error: err.message });
        console.error('Fetch error:', err);
      }
    }
  };
  componentDidMount() {
    this.GetPersons(localStorage.getItem('field') || '');
  }

  render() {
    if (this.state.shouldCrash) {
      throw new Error('Тестовая ошибка в render()');
    }
    return (
      <>
        <header className="header">
          <SearchForm ClickButton={this.GetPersons}></SearchForm>
        </header>
        <main>
          <CardList
            error={this.state.error}
            isLoad={this.state.isLoad}
            data={this.state.info}
          ></CardList>
          <button
            className="error-button"
            onClick={() => this.setState({ shouldCrash: true })}
          >
            Вызвать ошибку
          </button>
        </main>
        <footer></footer>
      </>
    );
  }
}
