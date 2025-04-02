'use client';

import { useEffect, useState } from 'react';
import { PlayerRankService } from '@/app/services/PlayerRankService';
import { PlayerRanks, PlayerRank } from '@/app/types/player';

const rankTitles = {
  rankByTotalPlayTime: '총 재생 시간',
  rankByTotalPlayVerseCount: '총 말씀 재생',
  rankByMaxPlayTimeAtOnce: '단일 재생 시간',
  rankByMaxPlayVerseCountAtOnce: '단일 말씀 재생',
  rankByTotalPlayCount: '총 재생 횟수'
};

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
  } else {
    return `${hours}시간 ${minutes}분 ${seconds}초`;
  }
};

const RankCard = ({ title, items }: { title: string; items: PlayerRank[] }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
            item.isMyRank ? 'bg-blue-50 hover:bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center space-x-3">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold
              ${index === 0 ? 'bg-yellow-400' : 
                index === 1 ? 'bg-gray-400' : 
                index === 2 ? 'bg-amber-600' : 
                'bg-gray-300'}`}>
              {index + 1}
            </span>
            <span className="font-medium text-gray-700">{item.name}</span>
          </div>
          <span className="text-gray-600">
            {title.includes('단일 재생 시간') ? formatTime(item.maxPlayTimeAtOnce) :
             title.includes('단일 말씀 재생') ? `${item.maxPlayVerseCountAtOnce.toLocaleString()}절` :
             title.includes('총 재생 시간') ? formatTime(item.totalPlayTime) :
             title.includes('총 말씀 재생') ? `${item.totalPlayVerseCount.toLocaleString()}절` :
             `${item.totalPlayCount.toLocaleString()}회`}
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
        const data = await PlayerRankService.getRanks();
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
          <RankCard title={rankTitles.rankByTotalPlayTime} items={ranks.rankByTotalPlayTime} />
          <RankCard title={rankTitles.rankByTotalPlayVerseCount} items={ranks.rankByTotalPlayVerseCount} />
          <RankCard title={rankTitles.rankByMaxPlayTimeAtOnce} items={ranks.rankByMaxPlayTimeAtOnce} />
          <RankCard title={rankTitles.rankByMaxPlayVerseCountAtOnce} items={ranks.rankByMaxPlayVerseCountAtOnce} />
          <RankCard title={rankTitles.rankByTotalPlayCount} items={ranks.rankByTotalPlayCount} />
        </div>
      </div>
    </div>
  );
}

