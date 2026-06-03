import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';

export const metadata: Metadata = {
  title: 'WatchWave',
  description: 'Your favorite movie and TV show management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-secondary text-white">
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
