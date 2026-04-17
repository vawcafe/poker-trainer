import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#2D5016',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Poker Trainer',
  description: 'SPR Poker Charts Trainer — Push/Fold, BB Defense, RFI',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Poker',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-[#0f0f0f] text-white min-h-screen antialiased">
        <div className="max-w-[430px] mx-auto">
          {children}
        </div>
      </body>
    </html>
  )
}
