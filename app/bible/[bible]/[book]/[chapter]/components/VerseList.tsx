'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRandomBackgroundId } from '@/app/lib/BackgroundUseCase';
import { getRandomParticlesId } from '@/app/lib/ParticlesUseCase';

interface Verse {
  id: number;
  book: number;
  chapter: number;
  verse: number;
  content: string;
}

interface VerseListProps {
  verses: Verse[];
  bookName: string;
}

export function VerseList({ verses, bookName }: VerseListProps) {
  const router = useRouter();
  const [selectedVerses, setSelectedVerses] = useState<number[]>([]);

  const handleVerseClick = (verseNumber: number) => {
    setSelectedVerses(prev => {
      const isSelected = prev.includes(verseNumber);
      if (isSelected) {
        return prev.filter(v => v !== verseNumber);
      } else {
        return [...prev, verseNumber].sort((a, b) => a - b);
      }
    });
  };

  const handleShare = () => {
    if (selectedVerses.length === 0 || verses.length === 0) return;
    
    const firstVerse = verses[0];
    const bgId = getRandomBackgroundId().toString();
    const ptId = getRandomParticlesId().toString();
    
    const shareUrl = `/share/bible/nkrv?book=${firstVerse.book}&chapter=${firstVerse.chapter}&verses=${selectedVerses.join(',')}&bg=${bgId}&pt=${ptId}}`;
    router.push(shareUrl);
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
        <div className="fixed bottom-4 right-4 flex gap-2">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
            선택된 절: {selectedVerses.length}개
          </div>
          <button
            onClick={handleShare}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-colors"
          >
            공유하기
          </button>
        </div>
      )}
    </>
  );
} 