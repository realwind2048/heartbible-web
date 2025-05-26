import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '기도문 작성',
  description: 'AI가 당신의 기도를 바탕으로 성경 구절과 함께 기도문을 작성해드립니다.',
  keywords: '기도문 작성, AI 기도, 성경 기도, 기도 도우미, 기독교 AI, 기도 도움, 성경 구절, 기도 제목',
  openGraph: {
    title: '기도문 작성',
    description: 'AI가 당신의 기도를 바탕으로 성경 구절과 함께 기도문을 작성해드립니다.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '마음말씀',
      },
    ],
    type: 'website',
  },
};

export default function PrayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 