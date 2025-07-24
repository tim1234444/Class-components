import { Card } from '../Card/Card';
import { Spinner } from '../Spinner/Spinner';

type CardType = {
  results: {
    name: string;
    image?: string;
  }[];
};
type Props = {
  error: string;
  data: CardType;
  isLoad: boolean;
};
export function CardList({ error, data, isLoad }: Props) {
  return (
    <>
      {isLoad && <Spinner></Spinner>}
      {!isLoad && !error && data.results.length > 0 && (
        <ul className="card-list">
          {data.results?.map((item) => (
            <Card key={item.image} name={item.name} image={item.image}></Card>
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
