'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Book = {
  book: string;
  name: string;
  chapterCount: number;
};

type QuickNavProps = {
  oldTestament: Book[];
  newTestament: Book[];
};

export default function QuickNav({ oldTestament, newTestament }: QuickNavProps) {
  const router = useRouter();
  const [testament, setTestament] = useState<'old' | 'new'>('old');
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [availableChapters, setAvailableChapters] = useState<number[]>([]);

  const books = testament === 'old' ? oldTestament : newTestament;

  useEffect(() => {
    // 책이 선택되면 해당 책의 장 수만큼 배열 생성
    if (selectedBook) {
      const book = books.find(b => b.book === selectedBook);
      if (book) {
        setAvailableChapters(Array.from({ length: book.chapterCount }, (_, i) => i + 1));
      }
    } else {
      setAvailableChapters([]);
    }
    setSelectedChapter('');
  }, [selectedBook, books]);

  const handleSubmit = () => {
    if (selectedBook && selectedChapter) {
      router.push(`/bible/nkrv/${selectedBook}/${selectedChapter}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-end bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex-1 min-w-[120px]">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          성경
        </label>
        <select
          value={testament}
          onChange={(e) => {
            setTestament(e.target.value as 'old' | 'new');
            setSelectedBook('');
          }}
          className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="old">구약성경</option>
          <option value="new">신약성경</option>
        </select>
      </div>

      <div className="flex-1 min-w-[120px]">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          책
        </label>
        <select
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">선택하세요</option>
          {books.map((book) => (
            <option key={book.book} value={book.book}>
              {book.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[120px]">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          장
        </label>
        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          disabled={!selectedBook}
          className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-2 px-3 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
        >
          <option value="">선택하세요</option>
          {availableChapters.map((chapter) => (
            <option key={chapter} value={chapter}>
              {chapter}장
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedBook || !selectedChapter}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        이동
      </button>
    </div>
  );
} 