'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import EntryPointForVerseCard from "./components/EntryPointForVerseCard";
import EntryPointForBible from "./components/EntryPointForBible";
import { EntryPointForMakeVerseCard } from '@/app/components/EntryPointForMakeVerseCard';
import { VerseFeed } from "./components/feed/VerseFeed";
import { BreadcrumbNavbar } from '@/app/components/navbar/breadcrumb-navbar';

const FREQUENT_QUESTIONS = [
  "십일조는 어떻게 드려야 하나요?",
  "매일 성경 읽는 시간을 어떻게 가져야 할까요?",
  "기도하는 방법을 알려주세요",
  "주일 예배의 의미와 중요성은 무엇인가요?",
  "성경 말씀을 어떻게 묵상해야 하나요?",
  "신앙생활에서 가장 중요한 것은 무엇인가요?",
  "하나님의 뜻을 어떻게 알 수 있나요?",
  "기도가 응답되지 않을 때는 어떻게 해야 하나요?",
  "성경에서 말하는 행복한 가정의 비결은 무엇인가요?",
  "일상생활에서 하나님을 어떻게 경험할 수 있나요?",
  "자녀를 어떻게 기독교적으로 양육해야 하나요?",
  "부모님을 공경하는 방법은 무엇인가요?",
  "가정 예배는 어떻게 드려야 하나요?",
  "가정에서의 신앙 교육은 어떻게 해야 할까요?",
  "직장에서의 신앙생활은 어떻게 해야 할까요?",
  "시간 관리와 안식일 준수는 어떻게 해야 할까요?",
  "일상의 시련을 어떻게 이겨낼 수 있나요?",
  "믿음이 약해질 때는 어떻게 해야 할까요?",
  "성령의 인도하심을 어떻게 받을 수 있나요?",
  "영적 성장을 위한 구체적인 방법은 무엇인가요?"
];

export default function Page() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [randomQuestions, setRandomQuestions] = useState<string[]>([]);

  useEffect(() => {
    // 랜덤 질문 1선택
    const shuffled = [...FREQUENT_QUESTIONS].sort(() => 0.5 - Math.random());
    setRandomQuestions(shuffled.slice(0, 1));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/bible/chat?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleQuestionClick = (question: string) => {
    setQuery(question);
  };

  return (
    <>
      <BreadcrumbNavbar />
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-6">
        <div className="container mx-auto px-4 max-w-3xl">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="성경 말씀에 대해 궁금한 점을 물어보세요..."
                className="w-full px-4 py-3 pr-24 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                물어보기
              </button>
            </div>
          </form>
        </div>
        
        {/* 자주 묻는 질문 섹션 */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-center mb-4 text-gray-700">자주 묻는 질문</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {randomQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(question)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors shadow-sm"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center gap-4 py-3 px-5 md:px-10"> 
        <div className="grid grid grid-cols-1 md:grid-cols-2 justify-center gap-4 mb-4">
          <EntryPointForVerseCard />
          <EntryPointForMakeVerseCard />
          <EntryPointForBible />
        </div>
        <div className="grid grid grid-cols-1 md:grid-cols-2 justify-center gap-4 mb-4">
          {/* <VerseFeed /> */}
        </div>
      </div>
    </>
  );
}