import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './reset.css';
import { RootApp } from './RootApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
);
