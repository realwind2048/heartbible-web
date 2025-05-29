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
      <div className="min-h-screen bg-gray-50">
        <BreadcrumbNavbar />
        <div className="p-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-sm">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!ranks) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BreadcrumbNavbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-600">순위 데이터를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbNavbar />
      <div className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">도전 성경일독 순위</h1>
            {periodType === 'month' && (
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg bg-white shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setPeriodType('month')}
                className={`flex-1 px-6 py-4 text-center transition-all duration-200 ${
                  periodType === 'month'
                    ? 'border-b-2 border-blue-500 text-blue-600 font-semibold bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                이번달 순위
              </button>
              <button
                onClick={() => setPeriodType('all')}
                className={`flex-1 px-6 py-4 text-center transition-all duration-200 ${
                  periodType === 'all'
                    ? 'border-b-2 border-blue-500 text-blue-600 font-semibold bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                전체 순위
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <div className="flex space-x-2 p-4">
                {(Object.keys(rankTypeLabels) as RankType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedRankType(type)}
                    className={`px-5 py-2.5 rounded-lg whitespace-nowrap transition-all duration-200 ${
                      selectedRankType === type
                        ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {rankTypeLabels[type]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
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
