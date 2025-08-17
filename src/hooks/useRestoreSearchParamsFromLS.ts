'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function useRestoredSearchParamsFromLS() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  let page = '1';
  let id = '';
  let field = '';

  if (typeof window !== 'undefined') {
    page = searchParams?.get('page') || localStorage.getItem('page') || '1';
    id = searchParams?.get('id') || localStorage.getItem('id') || '';
    field = localStorage.getItem('field') || '';
  }
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams?.toString());

    if (!searchParams?.get('page') && page) {
      newParams.set('page', page);
    }

    if (!searchParams?.get('id') && id) {
      newParams.set('id', id);
    }

    if (newParams.toString() !== searchParams?.toString()) {
      replace(`${pathname}?${newParams.toString()}`);
    }
  }, []);

  return { page, id, field };
}
