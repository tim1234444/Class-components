/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next';
import '../../../src/reset.css';
import { ErrorBoundary } from '../../components/RickAndMorty/ErrorBoundary/ErrorBoundary';
import '../../../src/index.css';
import { ThemeProvider } from '../../components/ThemeProvider';
import ReduxProvider from './ReduxProvider';
import { NextIntlClientProvider } from 'next-intl';
import Header from '../../components/HeaderLayout/Header';

export const metadata: Metadata = {
  title: 'Rick and Morty',
  description: 'My App',
};
type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <NextIntlClientProvider>
      <html lang="en">
        <body>
          <ReduxProvider>
            <ThemeProvider>
              <ErrorBoundary>
                <Header></Header>

                <main>{children}</main>
              </ErrorBoundary>
            </ThemeProvider>
          </ReduxProvider>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
