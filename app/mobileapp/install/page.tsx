
import InstallLayout from '@/app/mobileapp/install/components/InstallLayout';
import { Metadata } from 'next';
import { OG_IMAGE_URL } from '@/libs/constants';

const descriptionText = "매일의 위로와 힘, 당신의 따뜻한 신앙 동반자";

export const metadata: Metadata = {
  title: '마음말씀 - 앱 설치하기',
  description: descriptionText,
  openGraph: {
    title: '마음말씀 - 앱 설치하기',
    description: descriptionText,
    url: 'https://heartbible.app/mobileapp/install', // Replace with your actual domain
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'HeartBible Open Graph Image',
      },
    ],
    type: 'website',
  },
};

export default function InstallPage() {
  return (
    <InstallLayout>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        마음말씀
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mb-8">
        {descriptionText}
      </p>
    </InstallLayout>
  );
}
