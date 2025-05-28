import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '도전 성경일독 순위',
  description: '도전 성경일독에 참여한 사람들의 순위를 확인할 수 있습니다. 총 재생 시간, 총 말씀 재생, 단일 재생 시간, 단일 말씀 재생, 총 재생 횟수 순위를 확인할 수 있습니다.',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 