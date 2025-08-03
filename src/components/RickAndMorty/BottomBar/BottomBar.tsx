import { useDispatch, useSelector } from 'react-redux';
import { removeAll } from '../../../cardsReducer/cardsSlice';
import type { RootState } from '../../../store';
import { CSVLink } from 'react-csv';
import { BASE_API_URL } from '../../../constants';

type BottomBarProps = {
  selectedCount: number;
};

export function BottomBar({ selectedCount }: BottomBarProps) {
  const dispatch = useDispatch();
  const selectedCards = useSelector((state: RootState) => state.cards);

  if (selectedCount === 0) return null;
  const handleDownloadCsv = () => {
    const headers = [
      'Name',
      'Status',
      'Detail URL',
      'Species',
      'Type',
      'Gender',
      'Origin',
    ];
    if (!selectedCards.length) return [headers];

    const rows = selectedCards.map((item) => [
      item.name,
      item.status ?? '',
      `${BASE_API_URL}${item.id}`,
      item.species,
      item.type,
      item.gender,
      item.origin.name,
    ]);

    const csvContent = [headers, ...rows];
    return csvContent;
  };
  return (
    <div className="bottom-bar">
      <p>
        {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
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
