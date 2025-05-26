'use client';

import { useState, useEffect } from 'react';
import { MobileDefaultNavbar } from '../../component/navbar/MobileDefaultNavbar';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';
import { useRouter } from 'next/navigation';

export default function AIPrayerPage() {
  const router = useRouter();
  const { token: webviewToken } = useWebviewParams();
  const [token, setToken] = useState<string | null>(webviewToken);
  const [prayerContent, setPrayerContent] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (webviewToken) {
      console.log('Setting token from webview:', webviewToken);
      setToken(webviewToken);
    } else {
      console.log('No webview token available');
    }
  }, [webviewToken]);


  const handleSubmit = async () => {
    console.log('handleSubmit');
    if (!token) {
      alert('로그인이 필요합니다.');
      console.log('token 없음');
      return;
    }

    if (!prayerContent.trim()) {
      alert('기도 내용을 입력해주세요.');
      console.log('기도 내용 없음');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/prayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: prayerContent
        }),
      });

      if (!response.ok) {
        throw new Error('기도문 생성에 실패했습니다');
      }

      const data = await response.json();
      setAiResponse(data.aiMessage);
    } catch (error) {
      console.error('기도문 생성 실패:', error);
      setError(error instanceof Error ? error.message : '기도문 생성에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileDefaultNavbar title="AI 기도문 작성" />
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">기도 내용 작성</h2>
            <p className="text-gray-600 text-sm mb-4">
              기도하고 싶은 내용을 자유롭게 작성해주세요.
              AI가 당신의 기도를 바탕으로 성경 구절과 함께 기도문을 작성해드립니다.
            </p>
            <textarea
              value={prayerContent}
              onChange={(e) => setPrayerContent(e.target.value)}
              placeholder="예시) 직장에서 어려움을 겪고 있습니다. 지혜롭게 대처할 수 있도록 기도해주세요."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-black placeholder:text-gray-500"
              disabled={isLoading}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isLoading || !prayerContent.trim()}
                className={`px-4 py-2 rounded-lg text-white ${
                  isLoading || !prayerContent.trim()
                    ? 'bg-gray-400'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? '기도문 작성 중...' : '기도문 작성하기'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              {error}
            </div>
          )}

          {aiResponse && (
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">AI 기도문</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">{aiResponse}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    const textarea = document.createElement('textarea');
                    textarea.value = aiResponse;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    alert('기도문이 복사되었습니다.');
                  }}
                  className="text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>복사하기</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}