'use client';

import { useEffect, useState } from 'react';
import { PlayerRankService } from '@/app/services/PlayerRankService';
import { PlayerRanks } from '@/app/types/player';

const rankTitles = {
  totalPlayTime: '총 재생 시간',
  totalVersePlay: '총 말씀 재생',
  singlePlayTime: '단일 재생 시간',
  singleVersePlay: '단일 말씀 재생',
  totalPlayCount: '총 재생 횟수'
};

const RankCard = ({ title, items }: { title: string; items: any[] }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.rank}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold
              ${item.rank === 1 ? 'bg-yellow-400' : 
                item.rank === 2 ? 'bg-gray-400' : 
                item.rank === 3 ? 'bg-amber-600' : 
                'bg-gray-300'}`}>
              {item.rank}
            </span>
            <span className="font-medium text-gray-700">{item.name}</span>
          </div>
          <span className="text-gray-600">
            {item.value.toLocaleString()} {item.unit}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default function Page() {
  const [ranks, setRanks] = useState<PlayerRanks | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRanks = async () => {
      try {
        // TODO: 실제 토큰으로 교체 필요
        const token = 'your-bearer-token';
        const data = await PlayerRankService.getRanks(token);
        setRanks(data);
      } catch (err) {
        setError('순위 데이터를 불러오는데 실패했습니다.');
        console.error('Error fetching ranks:', err);
      }
    };

    fetchRanks();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!ranks) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">플레이어 미션 순위</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RankCard title={rankTitles.totalPlayTime} items={ranks.totalPlayTime} />
          <RankCard title={rankTitles.totalVersePlay} items={ranks.totalVersePlay} />
          <RankCard title={rankTitles.singlePlayTime} items={ranks.singlePlayTime} />
          <RankCard title={rankTitles.singleVersePlay} items={ranks.singleVersePlay} />
          <RankCard title={rankTitles.totalPlayCount} items={ranks.totalPlayCount} />
        </div>
      </div>
    </div>
  );
}

