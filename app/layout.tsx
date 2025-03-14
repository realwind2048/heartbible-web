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
        {children}
      </body>
      <GoogleAnalytics gaId="G-N7BTSPTN3T" />
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1576539061828377" 
        crossOrigin="anonymous"></script>
    </html>
  )
}