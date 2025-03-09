'use client'

import { useState } from 'react';

interface Verse {
  id: number;
  book: number;
  chapter: number;
  verse: number;
  content: string;
}

interface VerseListProps {
  verses: Verse[];
}

export function VerseList({ verses }: VerseListProps) {
  const [selectedVerses, setSelectedVerses] = useState<number[]>([]);

  const handleVerseClick = (verseNumber: number) => {
    setSelectedVerses(prev => {
      const isSelected = prev.includes(verseNumber);
      if (isSelected) {
        return prev.filter(v => v !== verseNumber);
      } else {
        return [...prev, verseNumber];
      }
    });
  };

  return (
    <>
      <ol className="list-none">
        {verses.map((verse) => (
          <li 
            key={verse.id}
            onClick={() => handleVerseClick(verse.verse)}
            className={`cursor-pointer transition-colors duration-200 ${
              selectedVerses.includes(verse.verse) 
                ? 'bg-blue-100 hover:bg-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex p-2">
              <p className="basis-8">{verse.verse}</p>
              <p className="basis-full">{verse.content}</p>
            </div>
          </li>
        ))}
      </ol>
      {selectedVerses.length > 0 && (
        <div 
          onClick={() => {
            // 선택된 절들의 내용을 추출
            const selectedContent = verses
              .filter(verse => selectedVerses.includes(verse.verse))
              .map(verse => `${verse.verse}. ${verse.content}`)
              .join('\n');

            // 공유할 텍스트 생성
            const shareText = `${selectedContent}\n\n마음말씀에서 공유됨`;

            // TBD: 카드 만들기
            console.log('shareText:', shareText);

          }}
          className="fixed bottom-4 right-4 flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{selectedVerses.length}개 선택됨</span>
          </div>
          <div className="border-l border-blue-400 pl-3">
            <span className="font-semibold">카드 만들기</span>
          </div>
        </div>
      )}
    </>
  );
} 