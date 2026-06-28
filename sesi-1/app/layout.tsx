import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Belajar Next.js + React Query',
  description: 'Modul 5 - TanStack React Query',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='id'>
      <body className='min-h-screen bg-white text-gray-900 antialiased'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}