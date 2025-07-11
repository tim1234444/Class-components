import { Component } from 'react';
import { Card } from './Card';

type CardType = {
  results: {
    name: string;
    image?: string;
  }[];
};
export class CardList extends Component<{ data: CardType }> {
  render() {
    return (
      <>
        <ul className="card-list">
          {this.props.data.results?.map((item, index) => (
            <Card name={item.name} image={item.image}></Card>
          ))}
        </ul>
      </>
    );
  }
}
