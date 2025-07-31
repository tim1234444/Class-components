import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { push, remove } from '../../../cardsReducer/cardsSlice';
import type { FetchPersonData } from '../../../type/type';
import { useDispatch } from 'react-redux';

type Props = {
  item: FetchPersonData;
  initChecked: boolean;
};
export function Card({ item, initChecked }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(initChecked);
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
      dispatch(push(item));
    } else {
      dispatch(remove(item.id));
    }
  };

  useEffect(() => {
    setChecked(initChecked);
  }, [initChecked]);
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
