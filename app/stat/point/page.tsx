'use client';

import { useEffect, useState } from 'react';
import { PointRankService } from '@/app/services/PointRankService';
import { PointRanks } from '@/app/types/point';
import { RankCard, RANK_TYPES } from '@/app/components/RankCard';

export default function PointPage() {
  const [ranks, setRanks] = useState<PointRanks | null>(null);
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
        const token = await getTokenFromApp();

        if (!token) {
          console.log('토큰이 없습니다.');
        }

        const data = await PointRankService.getRanks(token);
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
    <div className="min-h-screen bg-gray-100 p-3">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold mb-4 text-gray-800">포인트 순위</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RankCard type={RANK_TYPES.totalPoint} items={ranks.rankByTotalPoint} />
        </div>
      </div>
    </div>
  );
}

