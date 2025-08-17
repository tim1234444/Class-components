'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');
  const router = useRouter();

  const goHome = () => {
    router.replace(`/`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{t('notFoundTitle')}</h1>
      <p>{t('notFoundText')}</p>
      <button
        onClick={goHome}
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        {t('goHome')}
      </button>
    </div>
  );
}
