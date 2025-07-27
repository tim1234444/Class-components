import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

type Props = {
  closeDetail: () => void;
  PageNumber: number;
};

export function Pagination({ closeDetail, PageNumber }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = isNaN(page) ? 1 : page;

  const [numbers, SetNumbers] = useState<number[]>([]);
  useEffect(() => {
    const pages = new Set<number>();

    if (currentPage >= 1 && currentPage <= PageNumber) {
      pages.add(currentPage);
    }

    if (currentPage - 1 >= 1) {
      pages.add(currentPage - 1);
    }

    if (currentPage + 1 <= PageNumber) {
      pages.add(currentPage + 1);
    }
    if (currentPage === 1 && currentPage + 2 <= PageNumber) {
      pages.add(currentPage + 2);
    }
    if (PageNumber !== currentPage) {
      pages.add(PageNumber);
    }

    if (1 !== currentPage) {
      pages.add(1);
    }

    SetNumbers(Array.from(pages).sort((a, b) => a - b));
  }, [PageNumber, currentPage]);

  if (PageNumber <= 0) return null;

  return (
    <>
      {numbers && (
        <div className="pagination">
          {numbers.map((number) => (
            <button
              onClick={() => {
                closeDetail();
                localStorage.setItem('page', String(number));
                setSearchParams({ page: String(number) });
              }}
              className={`pagination__button ${number === currentPage ? 'pagination__button--active' : ''}`}
              key={number}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
