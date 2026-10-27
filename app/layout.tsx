import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { LanguageProvider } from '@/components/language-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CursorFx } from '@/components/cursor-fx'
import './globals.css'

// Geist has no Cyrillic glyphs: these two only supply Cyrillic as a per-glyph fallback (the `ru` language).
const cyrSans = Inter({ subsets: ['cyrillic'], variable: '--font-cyr-sans', display: 'swap' })
const cyrMono = JetBrains_Mono({ subsets: ['cyrillic'], variable: '--font-cyr-mono', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'RuffBuff | Portfolio', template: '%s | RuffBuff' },
  description: 'Personal portfolio of RuffBuff - Blockchain & IT Developer',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0e0e13',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable} ${cyrSans.variable} ${cyrMono.variable}`}>
      <body>
        <noscript>
          <style>{'[data-rv]{opacity:1!important;transform:none!important;filter:none!important}.word>span{transform:none!important;animation:none!important}'}</style>
        </noscript>
        <div className="bg-scene" aria-hidden>
          <div className="aurora aurora-1" />
          <div className="aurora aurora-2" />
          <div className="aurora aurora-3" />
          <div className="aurora aurora-4" />
          <div className="bg-grid" />
          <div className="bg-noise" />
        </div>
        <LanguageProvider>
          <CursorFx />
          <div className="w-full overflow-x-clip">
            <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 sm:px-10">
              <SiteHeader />
              <main className="flex flex-1 flex-col">{children}</main>
              <SiteFooter />
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
