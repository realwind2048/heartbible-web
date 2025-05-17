'use client';

import { useState, useEffect } from 'react';
import { MobileDefaultNavbar } from '../../../component/navbar/MobileDefaultNavbar';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface QnAHistory {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
}

export default function QnAHistoryPage() {
  const [history, setHistory] = useState<QnAHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: 실제 API 연동 시 이 부분을 수정해야 합니다
    const fetchHistory = async () => {
      try {
        // 임시 데이터
        const mockData: QnAHistory[] = [
          {
            id: '1',
            question: '예수님의 탄생에 대해 알려주세요',
            answer: '예수님은 베들레헴에서 마리아와 요셉 사이에서 태어나셨습니다...',
            timestamp: new Date().toISOString(),
          },
          {
            id: '2',
            question: '십계명이 무엇인가요?',
            answer: '십계명은 하나님께서 모세를 통해 이스라엘 백성에게 주신 열 가지 계명입니다...',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
          },
        ];
        setHistory(mockData);
      } catch (error) {
        console.error('Q&A 내역을 불러오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleNavbarBackEvent = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <MobileDefaultNavbar onBackClick={handleNavbarBackEvent} />
      <div className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">아직 Q&A 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">{item.question}</h3>
                  <span className="text-xs text-gray-500">
                    {format(new Date(item.timestamp), 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 