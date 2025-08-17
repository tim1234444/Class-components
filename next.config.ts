import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  distDir: './dist',
  images: {
    domains: ['rickandmortyapi.com'],
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
