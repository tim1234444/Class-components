import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

type Props = {
  PageNumber: number;
};

export function Pagination({ PageNumber }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
    console.log(PageNumber, currentPage);
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
                navigate(`/?page=${number}`);
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
