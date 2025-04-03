'use client';

import { useEffect, useState } from 'react';
import { PlayerRankService } from '@/app/services/PlayerRankService';
import { PlayerRanks, PlayerRank } from '@/app/types/player';

type RankType = 'totalPlayTime' | 'totalPlayVerseCount' | 'maxPlayTimeAtOnce' | 'maxPlayVerseCountAtOnce' | 'totalPlayCount';

const RANK_TYPES = {
  totalPlayTime: 'totalPlayTime',
  totalPlayVerseCount: 'totalPlayVerseCount',
  maxPlayTimeAtOnce: 'maxPlayTimeAtOnce',
  maxPlayVerseCountAtOnce: 'maxPlayVerseCountAtOnce',
  totalPlayCount: 'totalPlayCount',
} as const;

const rankTitles: Record<RankType, string> = {
  totalPlayTime: '총 재생 시간',
  totalPlayVerseCount: '총 말씀 재생',
  maxPlayTimeAtOnce: '단일 재생 시간',
  maxPlayVerseCountAtOnce: '단일 말씀 재생',
  totalPlayCount: '총 재생 횟수'
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

const getRankValue = (item: PlayerRank, type: RankType): string => {
  switch (type) {
    case RANK_TYPES.totalPlayTime:
      return formatTime(item.totalPlayTime);
    case RANK_TYPES.totalPlayVerseCount:
      return `${item.totalPlayVerseCount.toLocaleString()}절`;
    case RANK_TYPES.maxPlayTimeAtOnce:
      return formatTime(item.maxPlayTimeAtOnce);
    case RANK_TYPES.maxPlayVerseCountAtOnce:
      return `${item.maxPlayVerseCountAtOnce.toLocaleString()}절`;
    case RANK_TYPES.totalPlayCount:
      return `${item.totalPlayCount.toLocaleString()}회`;
    default:
      return '';
  }
};

const RankCard = ({ type, items }: { type: RankType; items: PlayerRank[] }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-bold mb-4 text-gray-800">{rankTitles[type]}</h2>
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
            {item.isMyRank && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                나의 순위
              </span>
            )}
          </div>
          <span className="text-gray-600">
            {getRankValue(item, type)}
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
    const getTokenFromApp = (): Promise<string | null> => {
      // Android
      if (window.AndroidInterface) {
        return Promise.resolve(window.AndroidInterface.getToken());
      }
      // iOS
      if (window.webkit?.messageHandlers?.getToken) {
        return new Promise((resolve) => {
          window.webkit!.messageHandlers.getToken.postMessage({
            callback: (token: string) => resolve(token)
          });
        });
      }
      return Promise.resolve(null);
    };

    const fetchRanks = async () => {
      try {
        // 1. URL 파라미터에서 토큰 확인
        const urlParams = new URLSearchParams(window.location.search);
        let token = urlParams.get('token');

        // 2. URL에 없다면 앱에서 토큰 가져오기 시도
        if (!token) {
          token = await getTokenFromApp();
        }

        // 3. 둘 다 없다면 localStorage 확인
        if (!token) {
          token = localStorage.getItem('token');
        }

        if (!token) {
          console.log('토큰이 없습니다.');
          // 토큰이 없어도 사용할 수 있음
        }

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
          <RankCard type={RANK_TYPES.totalPlayTime} items={ranks.rankByTotalPlayTime} />
          <RankCard type={RANK_TYPES.totalPlayVerseCount} items={ranks.rankByTotalPlayVerseCount} />
          <RankCard type={RANK_TYPES.maxPlayTimeAtOnce} items={ranks.rankByMaxPlayTimeAtOnce} />
          <RankCard type={RANK_TYPES.maxPlayVerseCountAtOnce} items={ranks.rankByMaxPlayVerseCountAtOnce} />
          <RankCard type={RANK_TYPES.totalPlayCount} items={ranks.rankByTotalPlayCount} />
        </div>
      </div>
    </div>
  );
}

