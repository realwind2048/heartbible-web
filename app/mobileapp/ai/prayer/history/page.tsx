'use client';

import { useState, useEffect } from 'react';
import { MobileDefaultNavbar } from '../../../component/navbar/MobileDefaultNavbar';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';
import { useRouter } from 'next/navigation';
import { DateUtil } from '@/app/utils/date';
import { FirebaseTimestamp } from '@/app/types/firebase';

interface PrayerHistory {
  id: string;
  content: string;
  aiPrayer: string;
  createdAt: FirebaseTimestamp;
}

export default function PrayerHistoryPage() {
  const router = useRouter();
  const { token: webviewToken } = useWebviewParams();
  const [token, setToken] = useState<string | null>(webviewToken);
  const [histories, setHistories] = useState<PrayerHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (webviewToken) {
      setToken(webviewToken);
    }
  }, [webviewToken]);

  useEffect(() => {
    const fetchHistories = async () => {
      if (!token) return;

      try {
        const response = await fetch('/api/ai/prayer/history', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('AI 기도문 작성 내역을 불러오는데 실패했습니다');
        }

        const data = await response.json();
        setHistories(data.data || []);
      } catch (error) {
        console.error('AI 기도문 작성 내역 로딩 실패:', error);
        setError(error instanceof Error ? error.message : 'AI 기도문 작성 내역을 불러오는데 실패했습니다');
        setHistories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistories();
  }, [token]);

  const handleNavbarBackEvent = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const handleItemClick = (history: PrayerHistory) => {
    router.push(`/mobileapp/ai/prayer/${history.id}`);
  };

  const hasHistories = Array.isArray(histories) && histories.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileDefaultNavbar title="AI 기도문 작성 내역" onBackClick={handleNavbarBackEvent} />
      
      <div className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-600">{error}</p>
          </div>
        ) : !hasHistories ? (
          <div className="text-center py-10">
            <p className="text-gray-600">아직 작성된 AI 기도문이 없습니다.</p>
            <button
              onClick={() => router.push('/mobileapp/ai/prayer')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              AI 기도문 작성하기
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {histories.map((history) => (
              <div
                key={history.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
                onClick={() => handleItemClick(history)}
              >
                <div className="p-5">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 mb-3 text-lg">{history.content}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{history.aiPrayer}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center">
                    <span className="text-xs text-gray-400 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {DateUtil.getRelativeTimeString(history.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}