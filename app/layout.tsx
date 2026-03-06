import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

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
    <html lang="en"> 
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
