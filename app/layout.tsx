import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Frontier AI Safety Exodus Tracker',
  description:
    'A verified, primary-source record of AI safety researchers leaving frontier labs — OpenAI, Anthropic, Google DeepMind.',
  openGraph: {
    title: 'Frontier AI Safety Exodus Tracker',
    description:
      'A verified, primary-source record of AI safety researchers leaving frontier labs.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
