import { useSearchParams } from 'react-router';

type Props = {
  name: string;
  image?: string;
  id: number;
};
export function Card({ name, image, id }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = () => {
    if (id) {
      localStorage.setItem('id', String(id));
      const params = new URLSearchParams(searchParams);
      params.set('id', String(id));
      setSearchParams(params);
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
