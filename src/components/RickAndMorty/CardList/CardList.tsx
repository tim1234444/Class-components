import { useSelector } from 'react-redux';
import type { FetchListData } from '../../../type/type';
import { Card } from '../Card/Card';
import { Spinner } from '../Spinner/Spinner';
import type { RootState } from '../../../store';
import { BottomBar } from '../BottomBar/BottomBar';

type Props = {
  error: string;
  data: FetchListData;
  isLoad: boolean;
};
export function CardList({ error, data, isLoad }: Props) {
  const selectIds = useSelector((state: RootState) =>
    state.cards.map((card) => card.id),
  );

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
                initChecked={selectIds.includes(item.id)}
              ></Card>
            ))}
          </ul>
        </>
      )}
      {error && !isLoad && (
        <div role="error" className="error-container">
          <h1>{error}</h1>
        </div>
      )}
      {!isLoad && !error && data.results.length === 0 && (
        <div role="error" className="error-container">
          <h1>There is nothing here</h1>
        </div>
      )}
      <BottomBar selectedCount={selectIds.length} />
    </>
  );
}
