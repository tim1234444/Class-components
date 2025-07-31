import { useDispatch, useSelector } from 'react-redux';
import { removeAll } from '../../../cardsReducer/cardsSlice';
import type { RootState } from '../../../store';

type BottomBarProps = {
  selectedCount: number;
};

export function BottomBar({ selectedCount }: BottomBarProps) {
  const dispatch = useDispatch();
  const selectedCards = useSelector((state: RootState) => state.cards);
  const handleDownloadCsv = () => {
    if (!selectedCards.length) return;

    const headers = ['Name', 'Description', 'Detail URL'];
    const rows = selectedCards.map((item) => [
      item.name,
      item.status ?? '',
      `https://example.com/details/${item.id}`,
    ]);

    const delimiter = ';';
    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(delimiter),
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCards.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (selectedCount === 0) return null;

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
      <button className="bottom-bar__button" onClick={handleDownloadCsv}>
        Download
      </button>
    </div>
  );
}
