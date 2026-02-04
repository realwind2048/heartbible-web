import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마음 채움 순위',
  description: '마음 채움 순위 획득 순위를 확인할 수 있습니다.',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
