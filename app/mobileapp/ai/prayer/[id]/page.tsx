'use client';

import { useState, useEffect } from 'react';
import { MobileDefaultNavbar } from '../../../component/navbar/MobileDefaultNavbar';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';
import { useRouter, useParams } from 'next/navigation';
import { DateUtil } from '@/app/utils/date';
import { FirebaseTimestamp } from '@/app/types/firebase';

interface PrayerHistory {
  id: string;
  content: string;
  aiPrayer: string;
  createdAt: FirebaseTimestamp;
}

export default function PrayerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [prayer, setPrayer] = useState<PrayerHistory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token: webviewToken } = useWebviewParams();
  const [token, setToken] = useState<string | null>(webviewToken);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);

  useEffect(() => {
    if (webviewToken) {
      setToken(webviewToken);
    }
  }, [webviewToken]);

  useEffect(() => {
    if (!token || !id) {
      return;
    }

    const fetchPrayerDetail = async () => {
      try {
        const response = await fetch(`/api/ai/prayer/history/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('기도문 상세 정보를 불러오는데 실패했습니다');
        }

        const data = await response.json();
        setPrayer(data.data);
        setError(null);
      } catch (error) {
        console.error('기도문 상세 정보를 불러오는데 실패했습니다:', error);
        setError(error instanceof Error ? error.message : '기도문 상세 정보를 불러오는데 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrayerDetail();
  }, [token, id]);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  const handleDeleteConfirm = async () => {
    if (!token) {
      setResultMessage('로그인이 필요합니다.');
      setIsSuccess(false);
      setShowResultDialog(true);
      return;
    }
    
    if (!id) {
      return;
    }

    setIsDeleting(true);
    setShowDeleteDialog(false);
    
    try {
      const response = await fetch(`/api/ai/prayer/history/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('기도문 삭제에 실패했습니다');
      }

      setResultMessage('기도문이 성공적으로 삭제되었습니다.');
      setIsSuccess(true);
      setShowResultDialog(true);
    } catch (error) {
      console.error('기도문 삭제에 실패했습니다:', error);
      setResultMessage('기도문 삭제에 실패했습니다');
      setIsSuccess(false);
      setShowResultDialog(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResultDialogClose = () => {
    setShowResultDialog(false);
    if (isSuccess) {
      router.back();
    }
  };

  const handleCopy = async () => {
    if (!prayer) return;

    const textToCopy = `요청 내용: ${prayer.content}\n\n기도문: ${prayer.aiPrayer}`;
    
    try {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      
      textarea.select();
      document.execCommand('copy');
      
      document.body.removeChild(textarea);
      
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2000);
    } catch (error) {
      console.error('복사하기 실패:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileDefaultNavbar
        title="기도문 내용"
        onBackClick={() => router.back()}
      />
      
      {/* 복사 완료 토스트 메시지 */}
      {showCopyToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          복사되었습니다
        </div>
      )}

      {/* 삭제 확인 다이얼로그 */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">삭제 확인</h3>
            <p className="text-gray-600 mb-6">정말로 이 기도문을 삭제하시겠습니까?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                disabled={isDeleting}
              >
                취소
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 결과 안내 다이얼로그 */}
      {showResultDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex flex-col items-center mb-4">
              {isSuccess ? (
                <svg className="w-12 h-12 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-12 h-12 text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <p className={`text-lg font-medium ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {resultMessage}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleResultDialogClose}
                className={`px-6 py-2 rounded-lg ${
                  isSuccess 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                } text-white`}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-600">{error}</p>
          </div>
        ) : prayer ? (
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {DateUtil.getRelativeTimeString(prayer.createdAt)}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">요청 내용</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{prayer.content}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">기도문</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{prayer.aiPrayer}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                onClick={handleCopy}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>복사하기</span>
              </button>
              <button
                onClick={handleDeleteClick}
                className="px-4 py-2 text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>삭제하기</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600">기도문을 찾을 수 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
} 