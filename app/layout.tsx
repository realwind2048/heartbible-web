import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
export const metadata: Metadata = {
  title: '마음말씀',
  description: '마음말씀은 성경을 쉽고 재미있게 읽을 수 있도록 돕는 서비스입니다. 성경 도우미 AI, 말씀 카드 공유하기, 설교 요약 등 다양한 기능을 제공합니다.',
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
      {process.env.NODE_ENV === 'production' && (
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1576539061828377" 
          crossOrigin="anonymous"></script>
      )}
    </html>
  )
}