import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './reset.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Detail } from './components/RickAndMorty/Detail/Detail';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
