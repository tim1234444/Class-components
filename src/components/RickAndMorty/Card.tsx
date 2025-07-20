import { Component } from 'react';


export class Card extends Component<{ name: string; image?: string }> {
  render() {
    return (
      <li className="card">
        <div className="card__container">
          {this.props.image && (
            <img src={this.props.image} alt={this.props.name} className="card__image" />
          )}
          <div className="card__content">
            <p className="card__name">{this.props.name}</p>
          </div>
        </div>
      </li>
    );
  }
}
