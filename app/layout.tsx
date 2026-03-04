import type { Metadata } from 'next'
import { Noto_Serif_JP, Noto_Sans_JP, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const notoSerif = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '記憶の回廊',
  description: 'ビジュアルノベル × 記憶術トレーニング',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '記憶の回廊',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${notoSerif.variable} ${notoSans.variable} ${jetbrains.variable} font-sans bg-background text-text-primary antialiased`}>
        {children}
      </body>
    </html>
  )
}
