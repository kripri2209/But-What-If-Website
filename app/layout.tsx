import type { Metadata } from 'next'
import { Playfair_Display, Crimson_Text, Roboto_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const crimson = Crimson_Text({ 
  subsets: ["latin"],
  weight: ['400', '600', '700'],
  variable: '--font-crimson',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Devils Advocate - Challenge Your Decisions",
  description: 'Get deep insights by challenging your assumptions. Devils Advocate uses AI to explore worst-case scenarios, identify hidden risks, and help you understand the true complexity of your choices.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${crimson.variable} ${robotoMono.variable}`}> 
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
