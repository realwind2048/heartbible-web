'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import EntryPointForVerseCard from "./components/EntryPointForVerseCard";
import EntryPointForBible from "./components/EntryPointForBible";
import { EntryPointForMakeVerseCard } from '@/app/components/EntryPointForMakeVerseCard';
import { VerseFeed } from "./components/feed/VerseFeed";
import { BreadcrumbNavbar } from '@/app/components/navbar/breadcrumb-navbar';
import { getRandomFrequentlyAskedQuestions } from '@/app/domain/usecase/FrequentlyAskedQuestionsUseCase';

export default function Page() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [randomQuestions, setRandomQuestions] = useState<string[]>([]);

  useEffect(() => {
    setRandomQuestions(getRandomFrequentlyAskedQuestions(1));
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
        <div className="mt-2">
          <h2 className="text-lg font-semibold text-center mb-2 text-gray-700">자주 묻는 질문</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {randomQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(question)}
                className="px-4 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors shadow-sm"
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