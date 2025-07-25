import { useEffect, useState } from 'react';

type Props = {
  PageNumber: number;
  onClick: (
    page: string,
    name: string,
    e?: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>;
};

export function Pagination({ onClick, PageNumber }: Props) {
  const [numbers, SetNumbers] = useState<number[]>();
  useEffect(() => {
    if (PageNumber > 0) {
      const nums = [...Array(PageNumber).keys()].map((i) => i + 1);
      SetNumbers(nums);
    } else {
      SetNumbers([]);
    }
  }, [PageNumber]);
  console.log(numbers);
  if (PageNumber <= 0) return null;

  return (
    <>
      {numbers && (
        <div className="pagination">
          {numbers.length <= 5 ? (
            numbers.map((number) => (
              <button className="pagination__button" key={number}>
                {number}
              </button>
            ))
          ) : (
            <>
              <button
                onClick={() =>
                  onClick('1', localStorage.getItem('field') || '')
                }
                className="pagination__button"
                key={1}
              >
                {1}
              </button>
              <button
                onClick={() =>
                  onClick('2', localStorage.getItem('field') || '')
                }
                className="pagination__button"
                key={2}
              >
                {2}
              </button>
              <span className="pagination__dots" key="dots">
                ...
              </span>
              <button
                onClick={() =>
                  onClick(
                    String(numbers.length - 1),
                    localStorage.getItem('field') || '',
                  )
                }
                className="pagination__button"
                key={numbers.length - 1}
              >
                {numbers.length - 1}
              </button>
              <button
                onClick={() =>
                  onClick(
                    String(numbers.length),
                    localStorage.getItem('field') || '',
                  )
                }
                className="pagination__button"
                key={numbers.length}
              >
                {numbers.length}
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
