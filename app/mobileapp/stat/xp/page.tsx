'use client';

import { useEffect, useState, useCallback } from 'react';
import { XpRankService } from '@/app/services/XpRankService';
import { XpRank } from '@/app/types/xp';
import { XpRankCard } from '@/app/components/XpRankCard';
import { MobileDefaultNavbar } from '../../component/navbar/MobileDefaultNavbar';
import { useHandleNavbarBack } from '@/app/hooks/useHandleNavbarBack';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';

export default function Page() {
  const [ranks, setRanks] = useState<XpRank[]>([]);
  const [myRank, setMyRank] = useState<XpRank | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const handleNavbarBackEvent = useHandleNavbarBack();
  const { token: webviewToken, isLoading: isParamsLoading } = useWebviewParams();

  const fetchRanks = useCallback(async () => {
    if (isParamsLoading) return;
    
    try {
      setLoading(true);
      const data = await XpRankService.getXpRanks(webviewToken || '');
      setRanks(data.rankings);
      setMyRank(data.myRank);
    } catch (err) {
      console.error('Error fetching XP ranks:', err);
      setError('순위 데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [webviewToken, isParamsLoading]);

  useEffect(() => {
    fetchRanks();
  }, [fetchRanks]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <MobileDefaultNavbar title="마음 채움 순위" onBackClick={handleNavbarBackEvent} />
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
      <MobileDefaultNavbar title="마음 채움 순위" onBackClick={handleNavbarBackEvent} />
      <div className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {myRank && (
                <XpRankCard title="내 순위" items={[myRank]} />
              )}
              <XpRankCard items={ranks} title="전체 순위" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}