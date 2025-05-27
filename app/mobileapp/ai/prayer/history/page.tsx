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

  const hasHistories = Array.isArray(histories) && histories.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileDefaultNavbar title="AI 기도문 작성 내역" />
      
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
                className="bg-white rounded-xl shadow-sm p-6 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{ DateUtil.getRelativeTimeString(history.createdAt) }</p>
                    <div className="mt-2">
                      <h3 className="font-semibold text-gray-800 mb-2">요청 내용</h3>
                      <p className="text-gray-700">{history.content}</p>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-semibold text-gray-800 mb-2">기도문</h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{history.aiPrayer}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const textarea = document.createElement('textarea');
                      textarea.value = history.aiPrayer;
                      document.body.appendChild(textarea);
                      textarea.select();
                      document.execCommand('copy');
                      document.body.removeChild(textarea);
                      alert('기도문이 복사되었습니다.');
                    }}
                    className="text-gray-500 hover:text-gray-700 ml-4"
                    aria-label="기도문 복사"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}