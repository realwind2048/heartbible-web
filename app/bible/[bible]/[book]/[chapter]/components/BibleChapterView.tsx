'use client'

import { ShareButton } from '@/app/components/ShareButton';
import Link from 'next/link';
import { VerseList } from './VerseList';

interface Verse {
  id: number;
  book: number;
  chapter: number;
  verse: number;
  content: string;
}

interface BibleChapterViewProps {
  bookName: string;
  chapter: number;
  verses: Verse[];
  prevChapterLink: string;
  nextChapterLink: string;
}

export function BibleChapterView({ bookName, chapter, verses, prevChapterLink, nextChapterLink }: BibleChapterViewProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단 헤더 영역 */}
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* 성경 버전 */}
          <div className="flex justify-between items-center mb-6">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
              개역개정
            </span>
            <ShareButton />
          </div>

          {/* 책/장 네비게이션 */}
          <div className="flex items-center justify-center gap-4">
            <Link href={prevChapterLink}>
              <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 dark:bg-gray-800">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </Link>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{bookName}</h1>
              <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">{chapter}장</h2>
            </div>
            <Link href={nextChapterLink}>
              <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 dark:bg-gray-800">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 본문 영역 */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <VerseList verses={verses} />
        </div>
      </div>

      {/* 푸터 영역 */}
      <div className="bg-gray-50 dark:bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            본서에 사용한 『성경전서 개역개정판』의 저작권은 재단법인 대한성서공회 소유이며 재단법인 대한성서공회의 허락을 받고 사용하였음
          </p>
        </div>
      </div>
    </div>
  );
} 