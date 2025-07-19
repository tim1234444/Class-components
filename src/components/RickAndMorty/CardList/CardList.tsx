import { Component } from 'react';
import { Card } from '../Card/Card';
import { Spinner } from '../Spinner/Spinner';

type CardType = {
  results: {
    name: string;
    image?: string;
  }[];
};
export class CardList extends Component<{
  error: string;
  data: CardType;
  isLoad: boolean;
}> {
  render() {
    return (
      <>
        {this.props.isLoad && <Spinner></Spinner>}
        {!this.props.isLoad &&
          !this.props.error &&
          this.props.data.results.length > 0 && (
            <ul className="card-list">
              {this.props.data.results?.map((item) => (
                <Card
                  key={item.image}
                  name={item.name}
                  image={item.image}
                ></Card>
              ))}
            </ul>
          )}
        {this.props.error && !this.props.isLoad && (
          <div className="error-container">
            <h1>{this.props.error}</h1>
          </div>
        )}
        {!this.props.isLoad &&
          !this.props.error &&
          this.props.data.results.length === 0 && (
            <div className="error-container">
              <h1>There is nothing here</h1>
            </div>
          )}
      </>
    );
  }
}
