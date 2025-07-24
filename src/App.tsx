import { RickAndMorty } from './pages/RickAndMorty';
import { ErrorBoundary } from './components/RickAndMorty/ErrorBoundary/ErrorBoundary';

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <RickAndMorty />
      </ErrorBoundary>
    </>
  );
}
