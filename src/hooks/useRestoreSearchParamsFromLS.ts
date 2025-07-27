import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

export function useRestoredSearchParamsFromLS() {
  const [searchParams, setSearchParams] = useSearchParams();

  const restored = {
    page: searchParams.get('page') || localStorage.getItem('page') || '1',
    id: searchParams.get('id') || localStorage.getItem('id') || '',
    field: localStorage.getItem('field') || '',
  };

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (!searchParams.has('page') && restored.page) {
      newParams.set('page', restored.page);
    }

    if (!searchParams.has('id') && restored.id) {
      newParams.set('id', restored.id);
    }

    setSearchParams(newParams);
  }, []);

  return restored;
}
