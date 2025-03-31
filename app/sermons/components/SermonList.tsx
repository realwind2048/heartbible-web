'use client';

import { useState, useEffect } from 'react';
import { SermonService } from '@/app/services/SermonService';
import { SermonCard } from './SermonCard';
import { ShareButton } from '@/app/components/ShareButton';
import { SermonVideo } from '@/app/types/youtube';

export default function SermonList() {
  const [sermons, setSermons] = useState<SermonVideo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const data = await SermonService.getAllSermons(100);
        setSermons(data);
      } catch (err) {
        setError('설교 목록을 불러오는데 실패했습니다.');
        console.error('Error fetching sermons:', err);
      }
    };

    fetchSermons();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">설교 말씀 요약</h1>
        <ShareButton />
      </div>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermons.map((sermon) => (
            sermon.id && <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>
      )}
    </div>
  );
} 