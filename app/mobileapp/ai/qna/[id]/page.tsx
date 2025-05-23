'use client';

import { useState, useEffect } from 'react';
import { MobileDefaultNavbar } from '../../../component/navbar/MobileDefaultNavbar';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';
import { useRouter, useParams } from 'next/navigation';
import { QnAHistory } from '@/app/types/firebase';
import { DateUtil } from '@/app/utils/date';

export default function QnADetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [qna, setQna] = useState<QnAHistory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token: webviewToken } = useWebviewParams();
  const [token, setToken] = useState<string | null>(webviewToken);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (webviewToken) {
      console.log('Setting token from webview:', webviewToken);
      setToken(webviewToken);
    } else {
      console.log('No webview token available');
    }
  }, [webviewToken]);

  useEffect(() => {
    if (!token || !id) {
      return;
    }

    const fetchQnADetail = async () => {
      try {
        const response = await fetch(`/api/ai-chat/ai-my-chat-v1-detail/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Q&A 상세 정보를 불러오는데 실패했습니다');
        }

        const data = await response.json();
        setQna(data);
        setError(null);
      } catch (error) {
        console.error('Q&A 상세 정보를 불러오는데 실패했습니다:', error);
        setError(error instanceof Error ? error.message : 'Q&A 상세 정보를 불러오는데 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQnADetail();
  }, [token, id]);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  const handleDeleteConfirm = async () => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    
    if (!id) {
      return;
    }

    setIsDeleting(true);
    setShowDeleteDialog(false);
    
    try {
      const response = await fetch(`/api/ai-chat/ai-my-chat-v1-history/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Q&A 삭제에 실패했습니다');
      }

      router.push('/mobileapp/ai/qna/history');
    } catch (error) {
      console.error('Q&A 삭제에 실패했습니다:', error);
      alert('Q&A 삭제에 실패했습니다');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShare = async () => {
    if (!qna) return;

    const shareText = `질문: ${qna.message}\n\n답변: ${qna.aiMessage}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Q&A 공유',
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('클립보드에 복사되었습니다');
      }
    } catch (error) {
      console.error('공유하기 실패:', error);
      alert('공유하기에 실패했습니다');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileDefaultNavbar
        title="Q&A 내용"
      />
      
      {/* 삭제 확인 다이얼로그 */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">삭제 확인</h3>
            <p className="text-gray-600 mb-6">정말로 이 Q&A를 삭제하시겠습니까?</p>
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

      <div className="container mx-auto px-4 py-6">
        {/* 디버깅 정보 표시 */}
        <div className="bg-yellow-50 p-4 mb-4 rounded-lg">
          <p className="text-sm text-gray-600">디버깅 정보:</p>
          <p className="text-sm text-gray-600">Token 존재 여부: {token ? '있음' : '없음'}</p>
          <p className="text-sm text-gray-600">Webview Token 존재 여부: {webviewToken ? '있음' : '없음'}</p>
          <p className="text-sm text-gray-600">ID: {id}</p>
          <p className="text-sm text-gray-600">isLoading: {isLoading ? 'true' : 'false'}</p>
          <p className="text-sm text-gray-600">isDeleting: {isDeleting ? 'true' : 'false'}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-600">{error}</p>
          </div>
        ) : !qna ? (
          <div className="text-center py-10">
            <p className="text-gray-600">Q&A를 찾을 수 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-800">질문</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={handleDeleteClick}
                    className="text-gray-500 hover:text-red-600"
                    disabled={isLoading || isDeleting}
                    aria-label="삭제하기"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button
                    onClick={handleShare}
                    className="text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                    aria-label="공유하기"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{qna.message}</p>
            </div>
            
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">답변</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{qna.aiMessage}</p>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <span className="text-sm text-gray-400 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {DateUtil.formatFirebaseTimestamp(qna.createdAt)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 