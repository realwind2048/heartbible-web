'use client';

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { MobileDefaultNavbar } from '../../../component/navbar/MobileDefaultNavbar';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';
import { useRouter } from 'next/navigation';
import { QnAHistory } from '@/app/types/firebase';
import { DateUtil } from '@/app/utils/date';

export const metadata: Metadata = {
    title: "Q&A 내역 | 말씀 길잡이",
    description: "이전에 나눈 Q&A 대화 내역을 확인할 수 있습니다.",
}

export default function QnAHistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<QnAHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token: webviewToken } = useWebviewParams();
  const [token, setToken] = useState<string | null>(webviewToken);

  useEffect(() => {
    if (webviewToken) {
      setToken(webviewToken);
    }
  }, [webviewToken]);

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/ai-chat/ai-my-chat-v1-history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Q&A 내역을 불러오는데 실패했습니다');
        }

        const text = await response.text();
        if (!text) {
          throw new Error('서버 응답이 비어있습니다');
        }

        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error('JSON 파싱 에러:', text);
          throw new Error('서버 응답을 처리하는데 실패했습니다. e:' + e);
        }

        if (!Array.isArray(data)) {
          console.error('예상치 못한 응답 형식:', data);
          throw new Error('응답 데이터 형식이 올바르지 않습니다');
        }

        setHistory(data);
        setError(null);
      } catch (error) {
        console.error('Q&A 내역을 불러오는데 실패했습니다:', error);
        setError(error instanceof Error ? error.message : 'Q&A 내역을 불러오는데 실패했습니다');
        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [token]);

  const handleNavbarBackEvent = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  const handleItemClick = (item: QnAHistory) => {
    router.push(`/mobileapp/ai/qna/${item.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileDefaultNavbar onBackClick={handleNavbarBackEvent} />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Q&A 내역</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-600">{error}</p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">아직 Q&A 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
                onClick={() => handleItemClick(item)}
              >
                <div className="p-5">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 mb-3 text-lg">{item.message}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{item.aiMessage}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center">
                    <span className="text-xs text-gray-400 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {DateUtil.getRelativeTimeString(item.createdAt)}
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