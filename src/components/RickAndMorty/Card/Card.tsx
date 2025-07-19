import { Component } from 'react';

export class Card extends Component<{ name: string; image?: string }> {
  render() {
    return (
      <li className="card" data-testid="card">
        <div className="card__container">
          {this.props.image && (
            <img
              data-testid="image"
              src={this.props.image}
              alt={this.props.name}
              className="card__image"
            />
          )}
          <div className="card__content">
            <p data-testid="description" className="card__name">
              {this.props.name}
            </p>
          </div>
        </div>
      </li>
    );
  }
}
