import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { store } from '../../../store';
import { push, remove } from '../../../cardsReducer/cardsSlice';
import type { FetchPersonData } from '../../../type/type';

type Props = {
  item: FetchPersonData;
};
export function Card({ item }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    if (item.id) {
      localStorage.setItem('id', String(item.id));
      const params = new URLSearchParams(searchParams);
      params.set('id', String(item.id));
      setSearchParams(params);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setChecked(e.target.checked);
    if (checked) {
      store.dispatch(push(item));
    } else {
      store.dispatch(remove(item.id));
    }
  };
  return (
    <li className="card" data-testid="card">
      <div className="card__container" onClick={handleClick}>
        <div
          className="card__checkbox-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            className="card__checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
            aria-label={`Выбрать карточку ${name}`}
          />
        </div>
        {item.image && (
          <img
            data-testid="image"
            src={item.image}
            alt={item.name}
            className="card__image"
          />
        )}
        <div className="card__content">
          <p data-testid="description" className="card__name">
            {item.name}
          </p>
        </div>
      </div>
    </li>
  );
}
