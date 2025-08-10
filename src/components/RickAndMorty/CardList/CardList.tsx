import { useSelector } from 'react-redux';
import type { FetchListData } from '../../../type/type';
import { Card } from '../Card/Card';
import { Spinner } from '../Spinner/Spinner';
import type { RootState } from '../../../store';
import { BottomBar } from '../BottomBar/BottomBar';
import { createSelector } from '@reduxjs/toolkit';
import { useTextError } from '../../../hooks/useTextError';

type Props = {
  error: unknown;
  data: FetchListData;
  isLoad: boolean;
};
export function CardList({ error, data, isLoad }: Props) {
  const errorText = useTextError(error);
  const selectIds = (state: RootState) => state.cards;
  const selectActiveIds = createSelector([selectIds], (cards) => {
    return cards.map((card) => card.id);
  });
  const activeIds = useSelector(selectActiveIds);

  return (
    <>
      {isLoad && (
        <div className="loader-container">
          <Spinner></Spinner>
        </div>
      )}

      {!isLoad && !error && data.results.length > 0 && (
        <>
          <ul className="card-list">
            {data.results?.map((item) => (
              <Card
                key={item.id}
                item={item}
                initChecked={activeIds.includes(item.id)}
              ></Card>
            ))}
          </ul>
        </>
      )}
      {error && !isLoad && (
        <div role="error" className="error-container">
          <h1>{errorText}</h1>
        </div>
      )}

      <BottomBar selectedCount={activeIds.length} />
    </>
  );
}
