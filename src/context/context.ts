import { createContext } from 'react';
import type { FetchFunction } from '../type/type';
export const FetchContext = createContext<FetchFunction>(() =>
  Promise.resolve(),
);
