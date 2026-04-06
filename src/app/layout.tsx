import type { Metadata } from 'next'
import './globals.css'
import { AppProvider } from '@/context/AppContext'

export const metadata: Metadata = {
  title: 'PayPay Match — マネーライトを現金・USDTに',
  description: 'PayPayマネーライトを現金・USDTに換金できる唯一のサービス。安全・即時・低手数料。',
  openGraph: {
    title: 'PayPay Match',
    description: 'PayPayマネーライトの唯一の換金サービス',
    locale: 'ja_JP',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" data-theme="dark" data-lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router layout.tsx is equivalent to _document; false positive for App Router */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Syne:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          <span className="jp-text">メインコンテンツへスキップ</span>
          <span className="en-text">Skip to main content</span>
        </a>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
