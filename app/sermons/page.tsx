import SermonList from '@/app/sermons/components/SermonList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마음말씀 - 설교 말씀 요약',
  description: '성경 말씀을 쉽게 이해하고 적용하세요',
  openGraph: {
    type: 'article',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HeartBible',
      },
    ],
  },
};

export default function SermonsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SermonList />
    </div>
  );
}
