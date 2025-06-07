'use client';

import Link from 'next/link';
import { HelpCircle, History, PenTool } from 'lucide-react';
import { MobileDefaultNavbar } from '../component/navbar/MobileDefaultNavbar';
import { useState } from 'react';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';
import { useRouter } from 'next/navigation';

const aiFeatures = [
  // {
  //   title: 'AI 채팅',
  //   description: 'AI와 자유롭게 대화하며 성경에 대해 물어보세요',
  //   icon: MessageSquare,
  //   href: '/mobileapp/ai/chat',
  //   color: 'bg-blue-500',
  // },
  {
    title: '말씀 길잡이 Q&A',
    description: '성경에 대한 질문에 AI가 답변해드립니다',
    icon: HelpCircle,
    href: '/mobileapp/ai/qna',
    color: 'bg-green-500',
  },
  {
    title: 'Q&A 내역',
    description: '이전에 나눈 Q&A 대화를 확인해보세요',
    icon: History,
    href: '/mobileapp/ai/qna/history',
    color: 'bg-orange-500',
  },
  {
    title: '기도문 작성',
    description: 'AI가 도와주는 기도문 작성',
    icon: PenTool,
    href: '/mobileapp/ai/prayer',
    color: 'bg-indigo-500',
  },
  {
    title: '기도문 작성 내역',
    description: '이전에 작성한 기도문을 확인해보세요',
    icon: History,
    href: '/mobileapp/ai/prayer/history',
    color: 'bg-purple-500',
  },
  // {
  //   title: 'AI와 전화',
  //   description: '음성으로 AI와 대화하며 성경을 공부하세요',
  //   icon: Phone,
  //   href: '/bible/voice',
  //   color: 'bg-purple-500',
  // },
  // {
  //   title: 'AI 말씀 요약',
  //   description: '성경 말씀을 AI가 요약해드립니다',
  //   icon: FileText,
  //   href: '/bible/summary',
  //   color: 'bg-yellow-500',
  // },
  // {
  //   title: 'AI 기도제목',
  //   description: 'AI가 도와주는 기도제목 작성',
  //   icon: BookOpen,
  //   href: '/prayer/topics',
  //   color: 'bg-red-500',
  // },
  // {
  //   title: 'AI 설교 작성',
  //   description: 'AI가 도와주는 설교 작성',
  //   icon: Mic,
  //   href: '/sermon/write',
  //   color: 'bg-pink-500',
  // },
];

export default function AIPage() {
  const { hasToken, isLoading, selectedbibleverses } = useWebviewParams();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  const handleNavbarBackEvent = () => {
    console.log('MobileDefaultNavbar의 뒤로 가기 버튼이 AIPage에서 감지되었습니다.');
    
    if (typeof window !== 'undefined') {
      if (window.JSBridge && typeof window.JSBridge.closeActivity === 'function') {
        console.log('Attempting to close activity from AIPage');
        window.JSBridge.closeActivity();
      } else {
        console.log('Not closing activity from AIPage. Standard router.back() will proceed.');
      }
    }
  };

  const handleLogin = () => {
    if (typeof window !== 'undefined' && window.JSBridge && typeof window.JSBridge.requestLogin === 'function') {
      console.log('Attempting to login through JSBridge');
      window.JSBridge.requestLogin();
    } else {
      console.log('JSBridge.requestLogin is not available');
    }
    setShowLoginModal(false);
  };

  const handleFeatureClick = (e: React.MouseEvent) => {
    if (!hasToken) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <MobileDefaultNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MobileDefaultNavbar onBackClick={handleNavbarBackEvent} />

      <div className="px-4 py-2 bg-green-50 border-b border-green-200">
        <div className="flex items-center text-green-800">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">말씀 길잡이 서비스가 정상적으로 복구되었습니다. 기다려 주셔서 감사합니다 🙇‍♂️</p>
        </div>
      </div>

      {selectedbibleverses && (
        <div className="px-4 py-2">
          <div className="bg-white rounded-lg shadow-sm p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-800">선택된 성경 구절</h3>
              <button
                onClick={() => router.push(`/mobileapp/ai/qna?verse=${encodeURIComponent(selectedbibleverses || '')}`)}
                className="text-sm bg-blue-600 text-white py-1.5 px-3 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
              >
                <span>질문하기</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">{selectedbibleverses}</p>
          </div>
        </div>
      )}

      <div className="flex-1 p-4">
        {!hasToken && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <p className="text-center text-gray-700 mb-4">로그인이 필요한 기능이에요.</p>
            <button
              onClick={handleLogin}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              로그인하기
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4">
          {aiFeatures.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              onClick={handleFeatureClick}
              className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4 flex items-center space-x-4">
                <div className={`${feature.color} p-3 rounded-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">{feature.title}</h2>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">로그인이 필요해요</h3>
            <p className="text-gray-600 mb-4">이 기능을 사용하려면 로그인이 필요합니다.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                취소
              </button>
              <button
                onClick={handleLogin}
                className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                로그인하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}