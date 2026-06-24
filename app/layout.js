import { Press_Start_2P, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const pixel = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'MEET // AGENT PORTFOLIO',
  description: 'Full-stack Python/React developer portfolio — tactical HUD style.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${pixel.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
