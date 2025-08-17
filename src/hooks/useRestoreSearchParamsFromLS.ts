'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function useRestoredSearchParamsFromLS() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const restored = {
    page: searchParams?.get('page') || localStorage.getItem('page') || '1',
    id: searchParams?.get('id') || localStorage.getItem('id') || '',
    field: localStorage.getItem('field') || '',
  };

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams?.toString());

    if (!searchParams?.get('page') && restored.page) {
      newParams.set('page', restored.page);
    }

    if (!searchParams?.get('id') && restored.id) {
      newParams.set('id', restored.id);
    }

    if (newParams.toString() !== searchParams?.toString()) {
      replace(`${pathname}?${newParams.toString()}`);
    }
  }, []);

  return restored;
}
