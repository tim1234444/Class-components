'use server';
import type { FetchPersonData } from '.././../type/type';
import { BASE_API_URL } from '../../constants';

export async function generateCsv(cards: FetchPersonData[]) {
  const headers = [
    'Name',
    'Status',
    'Detail URL',
    'Species',
    'Type',
    'Gender',
    'Origin',
  ];

  const rows = cards.map((item) => [
    item.name,
    item.status ?? '',
    `${BASE_API_URL}${item.id}`,
    item.species,
    item.type,
    item.gender,
    item.origin.name,
  ]);

  const escape = (value: string) => `"${String(value).replace(/"/g, '""')}"`;

  const csvContent = [headers, ...rows]
    .map((row) => row.map(escape).join(';'))
    .join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  return blob;
}
