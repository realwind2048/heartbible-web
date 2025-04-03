import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
export const metadata: Metadata = {
  title: '마음말씀',
  description: '마음말씀 사이트입니다.',
}

// Font files can be colocated inside of `pages`
const fontPretendard = localFont({ src: './font/PretendardVariable.woff2' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fontPretendard.className}>
        {/* 프로덕션 환경에서만 구글 애널리틱스 추가 */}
        {process.env.NODE_ENV === 'production' && (
          <GoogleAnalytics gaId="G-N7BTSPTN3T" />
        )}
        {children}
      </body>
    </html>
  )
}