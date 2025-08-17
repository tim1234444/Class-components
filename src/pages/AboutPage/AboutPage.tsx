import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="about-container">
      <h1 className="about-title">{t('aboutTitle')}</h1>
      <div className="about-content">
        <div className="about-photo">
          <Image src="/face.jpg" alt="" fill={true} />
        </div>
        <div className="about-text">
          <p>{t('p1')}</p>
          <p>{t('p2')}</p>
          <p>{t('p3')}</p>
          <p>
            {t('p4')}:{' '}
            <a
              href={t('links.course')}
              target="_blank"
              rel="noopener noreferrer"
            >
              RS School React Course
            </a>
          </p>
          <p>
            {t('p5')}:{' '}
            <a
              href={t('links.github')}
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/tim1234444
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
