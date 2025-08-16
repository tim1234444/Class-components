import { push, remove } from '../../../cardsReducer/cardsSlice';
import type { FetchPersonData } from '../../../type/type';
import { useDispatch } from 'react-redux';
import type { ChangeEvent } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
type Props = {
  item: FetchPersonData;
  initChecked: boolean;
};
export function Card({ item, initChecked }: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (item.id) {
      localStorage.setItem('id', String(item.id));
      const newParams = new URLSearchParams(searchParams?.toString());
      newParams.set('id', String(item.id));
      replace(`${pathname}?${newParams.toString()}`);
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    if (checked) {
      dispatch(push(item));
    } else {
      dispatch(remove(item.id));
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
            checked={initChecked}
            onChange={handleCheckboxChange}
            aria-label={`Выбрать карточку ${name}`}
          />
        </div>

        {item.image && (
          <div className="image-container">
            <Image
              style={{ width: '100%' }}
              fill={true}
              data-testid="image"
              src={item.image}
              alt={item.name}
              className="card__image"
            />
          </div>
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
