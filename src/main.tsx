import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Counter from './App';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <Counter name="Sara" age = '19'/>
  </StrictMode>,
);
