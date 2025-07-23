import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [],
    // Если вы используете локальные изображения, эта настройка не нужна
    // Но если планируете загружать изображения с внешних источников, добавьте домены:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'example.com',
    //   },
    // ],
  },
  // Отключаем строгую проверку ESLint при сборке (опционально)
  eslint: {
    ignoreDuringBuilds: false, // Установите true, если хотите игнорировать ESLint ошибки при сборке
  },
  // Отключаем проверку TypeScript при сборке (опционально)
  typescript: {
    ignoreBuildErrors: false, // Установите true, если хотите игнорировать TypeScript ошибки при сборке
  },
};

export default nextConfig;