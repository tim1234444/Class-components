'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function NavList() {
  const pathname = usePathname();
  const t = useTranslations('Navbar');

  const links = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
  ];

  return (
    <ul className="navbar-links">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={pathname === link.href ? 'active' : ''}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
