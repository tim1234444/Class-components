import { useContext } from 'react';
import { useSearchParams } from 'react-router';
import { FetchContext } from '../../../context/context';

type Props = {
  name: string;
  image?: string;
  id: number;
};
export function Card({ name, image, id }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const fetchPerson = useContext(FetchContext);
  const handleClick = () => {
    console.log(1);
    if (id) {
      const params = new URLSearchParams(searchParams);
      params.set('id', String(id));
      setSearchParams(params);
      fetchPerson({ id });
    }
  };
  return (
    <li className="card" data-testid="card">
      <div className="card__container" onClick={handleClick}>
        {image && (
          <img
            data-testid="image"
            src={image}
            alt={name}
            className="card__image"
          />
        )}
        <div className="card__content">
          <p data-testid="description" className="card__name">
            {name}
          </p>
        </div>
      </div>
    </li>
  );
}
