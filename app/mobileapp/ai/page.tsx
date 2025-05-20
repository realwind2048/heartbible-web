'use client';

import Link from 'next/link';
import { HelpCircle, History } from 'lucide-react';
import { MobileDefaultNavbar } from '../component/navbar/MobileDefaultNavbar';
import { useEffect, useState } from 'react';

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
  //   title: 'AI 기도 작성',
  //   description: 'AI와 함께 기도문을 작성해보세요',
  //   icon: PenTool,
  //   href: '/prayer/write',
  //   color: 'bg-indigo-500',
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
  const [token, setToken] = useState<string | null>(null);
  const [adid, setAdid] = useState<string | null>(null);
  const [lang, setLang] = useState<string | null>(null);
  const [chattype, setChattype] = useState<string | null>(null);
  const [versioncode, setVersioncode] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.clientReady = () => {
        console.log('Client is ready, checking params');
        const webviewToken = window.token;
        const webviewAdid = window.adid;
        const webviewLang = window.lang;
        const webviewChattype = window.chattype;
        const webviewVersioncode = window.versioncode;  
        setToken(webviewToken)
        setAdid(webviewAdid)
        setLang(webviewLang)
        setChattype(webviewChattype)
        setVersioncode(webviewVersioncode)
        setHasToken(!!webviewToken);
        setIsLoading(false);
      };
    }

    const requestParams = () => {
      if (typeof window !== 'undefined' && window.JSBridge && typeof window.JSBridge.requestParams === 'function') {
        console.log('Requesting params through JSBridge');
        window.JSBridge.requestParams();
      } else {
        console.log('JSBridge.requestParams is not available, using webviewToken');
        setHasToken(false);
        setIsLoading(false);
      }
    };

    requestParams();

    return () => {
      if (typeof window !== 'undefined') {
        delete window.clientReady;
      }
    };
  }, [token]);

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
        <div className="grid grid-cols-1 gap-4 mt-6">
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