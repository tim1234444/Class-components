import { Component } from 'react';

export class Spinner extends Component {
  render() {
    return (
      <>
        <div className="loader-container">
          <span data-testid="loader" className="loader"></span>{' '}
        </div>
      </>
    );
  }
}
