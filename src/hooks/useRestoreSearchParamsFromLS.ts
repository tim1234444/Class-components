'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function useRestoredSearchParamsFromLS() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [restored, setRestored] = useState({
    page: '1',
    id: '',
    field: '',
  });

  useEffect(() => {
    const page =
      searchParams?.get('page') || localStorage.getItem('page') || '1';
    const id = searchParams?.get('id') || localStorage.getItem('id') || '';
    const field = localStorage.getItem('field') || '';
    setRestored({ page, id, field });
    const newParams = new URLSearchParams(searchParams?.toString());

    if (!searchParams?.get('page') && page) {
      newParams.set('page', restored.page);
    }

    if (!searchParams?.get('id') && id) {
      newParams.set('id', restored.id);
    }

    if (newParams.toString() !== searchParams?.toString()) {
      replace(`${pathname}?${newParams.toString()}`);
    }
  }, [searchParams]);

  return restored;
}
