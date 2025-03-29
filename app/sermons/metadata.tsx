import { OG_IMAGE_URL } from '@/libs/constants';

export async function generateMetadata() {
  return {
    title: '마음말씀 - 설교 말씀 요약',
    description: '성경 말씀을 쉽게 이해하고 적용하세요',
    openGraph: {
        type: 'article',
        images: [
          {
            url: OG_IMAGE_URL,
            width: 1200,
            height: 630,
            alt: 'HeartBible',
          },
        ],
      },
  };
} 