import { Component } from 'react';
import { SearchForm } from '../components/RickAndMorty/form';

import { CardList } from '../components/RickAndMorty/CardList';

export class RickAndMorty extends Component {
  state = {
    info: {
      results: [],
    },
  };
  GetPersons = async (e: React.FormEvent<HTMLFormElement>, name: string) => {
    e.preventDefault();
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${name}`,
    );
    const data = await res.json();
    this.setState({ info: data });
    console.log(data);
  };

  render() {
    return (
      <>
        <header className="header">
          <SearchForm ClickButton={this.GetPersons}></SearchForm>
        </header>
        <main>
          <CardList data={this.state.info}></CardList>
        </main>
        <footer></footer>
      </>
    );
  }
}
