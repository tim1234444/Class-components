import { useDispatch, useSelector } from 'react-redux';
import { removeAll } from '../../../cardsReducer/cardsSlice';
import type { RootState } from '../../../store';
import { CSVLink } from 'react-csv';

type BottomBarProps = {
  selectedCount: number;
};

export function BottomBar({ selectedCount }: BottomBarProps) {
  const dispatch = useDispatch();
  const selectedCards = useSelector((state: RootState) => state.cards);

  if (selectedCount === 0) return null;
  const handleDownloadCsv = () => {
    const headers = ['Name', 'Description', 'Detail URL'];
    if (!selectedCards.length) return [headers];

    const rows = selectedCards.map((item) => [
      item.name,
      item.status ?? '',
      `https://rickandmortyapi.com/${item.id}`,
    ]);

    const csvContent = [headers, ...rows];
    console.log(csvContent);
    return csvContent;
  };
  return (
    <div className="bottom-bar">
      <p>
        {selectedCount} элемент{selectedCount > 1 ? 'ов' : ''} выбрано
      </p>
      <button
        onClick={() => {
          dispatch(removeAll());
        }}
        className="bottom-bar__button"
      >
        Unselect all
      </button>
      <CSVLink
        separator={';'}
        filename={`${selectedCards.length}_items.csv`}
        className="bottom-bar__button"
        data={handleDownloadCsv()}
      >
        {' '}
        Download{' '}
      </CSVLink>
    </div>
  );
}
