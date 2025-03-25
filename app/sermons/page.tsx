'use client';

import { useState } from 'react';
import { BreadcrumbNavbar } from '@/app/components/navbar/breadcrumb-navbar';
import { SermonCard } from './components/SermonCard';
import { SermonFilter } from './components/SermonFilter';
import { SermonVideo } from '../types/youtube';

// 임시 데이터 (나중에 API로 대체)
const DUMMY_SERMONS: SermonVideo[] = [
  {
    id: '1',
    title: '요한복음 강해: 생명의 빛',
    churchName: '사랑의교회',
    thumbnailUrl: 'https://i.ytimg.com/vi/example1/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=example1',
    summary: '요한복음 1장의 말씀을 통해 예수님이 어떻게 생명의 빛으로 오셨는지 설명합니다. 이 말씀은 우리의 영적 생활에 깊은 통찰을 제공합니다.',
    pastor: '오정현 목사',
    date: '2024-03-15',
    bibleVerses: ['요한복음 1:1-14']
  },
  // 추가 더미 데이터...
];

export default function SermonsPage() {
  const [selectedChurch, setSelectedChurch] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredSermons = DUMMY_SERMONS.filter(sermon => {
    const matchesChurch = selectedChurch === 'all' || sermon.churchName === selectedChurch;
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesChurch && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          교회 설교 말씀 요약
        </h1>

        <SermonFilter
          selectedChurch={selectedChurch}
          onChurchChange={setSelectedChurch}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredSermons.map(sermon => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>
      </main>
    </div>
  );
} 