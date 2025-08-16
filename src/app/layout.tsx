/* eslint-disable react-refresh/only-export-components */
import { ThemeToggle } from '../components/ThemeButton';
import type { Metadata } from 'next';
import '../../src/reset.css';
import { ErrorBoundary } from '../components/RickAndMorty/ErrorBoundary/ErrorBoundary';
import '../../src/index.css';
import { ThemeProvider } from '../components/ThemeProvider';
import ReduxProvider from './ReduxProvider';

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'My App',
};
type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <ErrorBoundary>
              <header>
                <nav className="navbar">
                  <div className="navbar-logo">MyApp</div>
                  <ThemeToggle />
                </nav>
              </header>

              <main>{children}</main>
            </ErrorBoundary>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
