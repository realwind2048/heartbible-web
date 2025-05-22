'use client';

import { useState, useEffect } from 'react';
import { MobileDefaultNavbar } from '../../../component/navbar/MobileDefaultNavbar';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';
import { useRouter } from 'next/navigation';

interface QnAHistory {
  message: string;
  aiMessage: string;
  createdAt: string;
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
    router.push(`/mobileapp/ai/qna/history/${encodeURIComponent(item.timestamp)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <MobileDefaultNavbar onBackClick={handleNavbarBackEvent} />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Q&A 내역</h1>
        
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
                key={`${item.message}-${item.timestamp}-${index}`}
                className="bg-white rounded-lg shadow-sm p-4 space-y-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 h-[120px] flex flex-col justify-between"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800 line-clamp-2">{item.message}</h3>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-600 text-sm line-clamp-2">{item.aiMessage}</p>
                  <span className="text-xs text-gray-400 mt-2">
                    {new Date(item.timestamp).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 