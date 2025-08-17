import { useDispatch, useSelector } from 'react-redux';
import { removeAll } from '../../../cardsReducer/cardsSlice';
import type { RootState } from '../../../store';
import { generateCsv } from '../../../app/actions/generateCsv';

type BottomBarProps = {
  selectedCount: number;
};

export function BottomBar({ selectedCount }: BottomBarProps) {
  const dispatch = useDispatch();
  const selectedCards = useSelector((state: RootState) => state.cards);

  if (selectedCount === 0) return null;
  const handleDownloadCsv = async () => {
    const csvContent = await generateCsv(selectedCards);
    const blob = new Blob([csvContent], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCards.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
      <button onClick={handleDownloadCsv} className="bottom-bar__button">
        Download
      </button>
    </div>
  );
}
