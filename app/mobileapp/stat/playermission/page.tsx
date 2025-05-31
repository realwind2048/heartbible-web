'use client';

import { useEffect, useState, useCallback } from 'react';
import { PlayerRankService } from '@/app/services/PlayerRankService';
import { PlayerRanks } from '@/app/types/player';
import { RankCard, RANK_TYPES } from '@/app/components/RankCard';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';
import { MobileDefaultNavbar } from '../../component/navbar/MobileDefaultNavbar';
import { useHandleNavbarBack } from '@/app/hooks/useHandleNavbarBack';

type PeriodType = 'month' | 'all';

export default function Page() {
  const [ranks, setRanks] = useState<PlayerRanks | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token: webviewToken, isLoading } = useWebviewParams();
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [periodType, setPeriodType] = useState<PeriodType>('month');
  const handleNavbarBackEvent = useHandleNavbarBack();
  const [cachedRanks, setCachedRanks] = useState<Record<PeriodType, PlayerRanks | null>>({
    month: null,
    all: null
  });

  // 월 선택 셀렉터 임시 숨김
  // // 사용 가능한 월 목록 생성 (현재 월부터 6개월 전까지)
  // const availableMonths = Array.from({ length: 6 }, (_, i) => {
  //   const date = new Date();
  //   date.setMonth(date.getMonth() - i);
  //   return {
  //     key: `month-${i}`,
  //     value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
  //     label: `${date.getFullYear()}년 ${date.getMonth() + 1}월`
  //   };
  // });

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(currentMonth);
  }, []);

  const fetchRanks = useCallback(async () => {
    if (isLoading) return;

    // 캐시된 데이터가 있으면 사용
    if (cachedRanks[periodType]) {
      setRanks(cachedRanks[periodType]);
      return;
    }

    try {
      const data = await PlayerRankService.getPlayerMissionRanks(webviewToken || '', {
        period: periodType,
        yearMonthId: periodType === 'month' ? selectedMonth : undefined
      });
      setRanks(data);
      setCachedRanks(prev => ({
        ...prev,
        [periodType]: data
      }));
    } catch (err) {
      setError('순위 데이터를 불러오는데 실패했습니다.');
      console.error('Error fetching ranks:', err);
    }
  }, [webviewToken, periodType, selectedMonth, isLoading, cachedRanks]);

  useEffect(() => {
    fetchRanks();
  }, [fetchRanks]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <MobileDefaultNavbar title="도전 성경일독 순위" onBackClick={handleNavbarBackEvent} />
        <div className="p-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <MobileDefaultNavbar title="도전 성경일독 순위" onBackClick={handleNavbarBackEvent} />
      <div className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* 월 선택 셀렉터 임시 숨김
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {periodType === 'month' && (
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                {availableMonths.map((month) => (
                  <option key={month.key} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            )}
          </div>
          */}

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-gray-200">
              <button
                onClick={() => setPeriodType('month')}
                className={`py-4 text-center transition-all ${
                  periodType === 'month'
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                이번달 순위
              </button>
              <button
                onClick={() => setPeriodType('all')}
                className={`py-4 text-center transition-all ${
                  periodType === 'all'
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                전체 순위
              </button>
            </div>
          </div>

          {!ranks ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RankCard type={RANK_TYPES.totalPlayTime} items={ranks.rankByTotalPlayTime} />
              <RankCard type={RANK_TYPES.totalPlayVerseCount} items={ranks.rankByTotalPlayVerseCount} />
              <RankCard type={RANK_TYPES.maxPlayTimeAtOnce} items={ranks.rankByMaxPlayTimeAtOnce} />
              <RankCard type={RANK_TYPES.maxPlayVerseCountAtOnce} items={ranks.rankByMaxPlayVerseCountAtOnce} />
              <RankCard type={RANK_TYPES.totalPlayCount} items={ranks.rankByTotalPlayCount} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
