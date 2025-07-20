import { Component } from 'react';
import { RickAndMorty } from './pages/RickAndMorty';
import { ErrorBoundary } from './components/RickAndMorty/ErrorBoundary/ErrorBoundary';

export default class App extends Component {
  render() {
    return (
      <>
        <ErrorBoundary>
          <RickAndMorty />
        </ErrorBoundary>
      </>
    );
  }
}
