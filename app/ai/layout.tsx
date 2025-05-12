import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI 성경 도우미',
  description: 'AI와 함께하는 성경 공부, 기도, 설교 작성',
  openGraph: {
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HeartBible AI',
      },
    ],
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 