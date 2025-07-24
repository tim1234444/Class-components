type Props = {
  name: string;
  image?: string;
};
export function Card({ name, image }: Props) {
  return (
    <li className="card" data-testid="card">
      <div className="card__container">
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
