'use client';
import { Link } from '../i18n/navigation';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { href } from 'react-router';

export default function NavList() {
  const pathname = usePathname();
  const t = useTranslations('Navbar');

  const links = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
  ];
  const finalPath = '/' + pathname.split('/').slice(2).join('/');
  return (
    <ul className="navbar-links">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={finalPath === link.href ? 'active' : ''}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
