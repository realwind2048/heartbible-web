'use client';

import { useEffect, useState } from 'react';
import { PlayerRankService } from '@/app/services/PlayerRankService';
import { PlayerRanks } from '@/app/types/player';
import { RankCard, RANK_TYPES } from '@/app/components/RankCard';
import { BreadcrumbNavbar } from '@/app/components/navbar/breadcrumb-navbar';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';

type PeriodType = 'month' | 'all';
type RankType = keyof typeof RANK_TYPES;

const getRankKey = (type: RankType): keyof PlayerRanks => {
  return `rankBy${type.charAt(0).toUpperCase()}${type.slice(1)}` as keyof PlayerRanks;
};

export default function Page() {
  const [ranks, setRanks] = useState<PlayerRanks | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token: webviewToken } = useWebviewParams();
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [periodType, setPeriodType] = useState<PeriodType>('month');
  const [selectedRankType, setSelectedRankType] = useState<RankType>('totalPlayTime');

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
      label: `${date.getFullYear()}년 ${date.getMonth() + 1}월`
    };
  });

  const rankTypeLabels: Record<RankType, string> = {
    totalPlayTime: '총 재생시간',
    totalPlayVerseCount: '총 재생구절 수',
    maxPlayTimeAtOnce: '최대 연속 재생시간',
    maxPlayVerseCountAtOnce: '최대 연속 재생구절 수',
    totalPlayCount: '총 재생 횟수'
  };

  useEffect(() => {
    const fetchRanks = async () => {
      try {
        const data = await PlayerRankService.getRanks(webviewToken || '', {
          period: periodType,
          month: periodType === 'month' ? selectedMonth : undefined
        });
        setRanks(data);
      } catch (err) {
        setError('순위 데이터를 불러오는데 실패했습니다.');
        console.error('Error fetching ranks:', err);
      }
    };

    fetchRanks();
  }, [webviewToken, periodType, selectedMonth]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <BreadcrumbNavbar />
        <div className="p-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!ranks) {
    return (
      <div className="min-h-screen bg-gray-100">
        <BreadcrumbNavbar />
        <div className="p-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <BreadcrumbNavbar />
      <div className="p-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-gray-800">도전 성경일독 순위</h1>
            {periodType === 'month' && (
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white shadow-sm"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setPeriodType('month')}
                className={`flex-1 px-4 py-3 text-center ${
                  periodType === 'month'
                    ? 'border-b-2 border-blue-500 text-blue-500 font-medium'
                    : 'text-gray-500'
                }`}
              >
                이번달 순위
              </button>
              <button
                onClick={() => setPeriodType('all')}
                className={`flex-1 px-4 py-3 text-center ${
                  periodType === 'all'
                    ? 'border-b-2 border-blue-500 text-blue-500 font-medium'
                    : 'text-gray-500'
                }`}
              >
                전체 순위
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
            <div className="flex space-x-2 p-2">
              {(Object.keys(rankTypeLabels) as RankType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedRankType(type)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedRankType === type
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {rankTypeLabels[type]}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <RankCard
              type={RANK_TYPES[selectedRankType]}
              items={ranks[getRankKey(selectedRankType)]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
