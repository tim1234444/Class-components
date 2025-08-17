import { useTranslations } from 'next-intl';
import { ThemeToggle } from '../ThemeButton';
import { LanguageSwitcher } from '../LanguageSwitcher';

export default function Header() {
  const t = useTranslations('HomePage');
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-logo">{t('logo')}</div>
        <ThemeToggle />
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
