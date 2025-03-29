'use client';

import { useState, useEffect } from 'react';
import { BreadcrumbNavbar } from '@/app/components/navbar/breadcrumb-navbar';
import { SermonCard } from './components/SermonCard';
import { SermonFilter } from './components/SermonFilter';
import { SermonVideo } from '../types/youtube';

export default function SermonsPage() {
  const [selectedChurch, setSelectedChurch] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sermons, setSermons] = useState<SermonVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/sermon/all-sermon-summary?size=10');
        if (!response.ok) {
          throw new Error('Failed to fetch sermons');
        }
        const data = await response.json();
        setSermons(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '설교 목록을 가져오는데 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSermons();
  }, []);

  const filteredSermons = sermons.filter(sermon => {
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

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 mt-8">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredSermons.map(sermon => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
            {filteredSermons.length === 0 && (
              <div className="col-span-full text-center text-gray-500 mt-8">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
} 