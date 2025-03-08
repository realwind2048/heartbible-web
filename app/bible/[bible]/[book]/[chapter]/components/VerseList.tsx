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
            className={`cursor-pointer transition-colors duration-200 hover:bg-gray-100 ${
              selectedVerses.includes(verse.verse) ? 'bg-blue-100' : ''
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
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
          선택된 절: {selectedVerses.length}개
        </div>
      )}
    </>
  );
} 