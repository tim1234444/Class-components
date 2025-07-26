import type { FetchListData } from '../../../type/type';
import { Card } from '../Card/Card';
import { Spinner } from '../Spinner/Spinner';

type Props = {
  error: string;
  data: FetchListData;
  isLoad: boolean;
};
export function CardList({ error, data, isLoad }: Props) {
  return (
    <>
      {isLoad && (
        <div className="loader-container">
          <Spinner></Spinner>
        </div>
      )}
      {!isLoad && !error && data.results.length > 0 && (
        <ul className="card-list">
          {data.results?.map((item) => (
            <Card
              key={item.image}
              name={item.name}
              image={item.image}
              id={item.id}
            ></Card>
          ))}
        </ul>
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
    </>
  );
}
