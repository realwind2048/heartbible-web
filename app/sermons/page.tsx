import SermonList from '@/app/sermons/components/SermonList';
import { Metadata } from 'next';
import { BreadcrumbNavbar } from '@/app/components/navbar/breadcrumb-navbar';

export const metadata: Metadata = {
  title: '설교 말씀 요약 목록',
  description: '교회 목사님들의 설교 말씀 요약 목록입니다.',
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
    <div className="min-h-screen bg-gray-100">
      <BreadcrumbNavbar />
      <div className="container mx-auto px-4 py-8">
        <SermonList />
      </div>
    </div>
  );
}
