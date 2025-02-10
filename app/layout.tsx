import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Site for testing nextjs',
  description: 'This is my site',
}

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}