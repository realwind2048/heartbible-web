'use client'

import { useRouter } from 'next/navigation';

/**
 * 정보를 받아서 VerseCard 컴포넌트를 렌더링하는 페이지
 */
export function EntryPointForMakeVerseCard() {
  const router = useRouter();

  const handleMakeVerseCard = () => {
    router.push('/share/heartbible/make');
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">말씀 카드 만들기</h2>
      <p className="text-gray-600">나만의 말씀 카드를 만들어보세요</p>
      <button
        onClick={handleMakeVerseCard}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
      ✨ 말씀 카드 만들기
    </button>
    </div>
  );
}