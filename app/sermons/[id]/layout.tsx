import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '설교 말씀 요약',
  description: '교회 목사님들의 설교 말씀을 요약한 내용을 원본 링크와 함께 제공합니다.',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 