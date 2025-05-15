'use client';

import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { MobileDefaultNavbar } from '../component/navbar/MobileDefaultNavbar';
import { getTokenFromApp } from '@/app/utils/token';
import { useEffect, useState } from 'react';

const aiFeatures = [
  {
    title: 'AI 채팅',
    description: 'AI와 자유롭게 대화하며 성경에 대해 물어보세요',
    icon: MessageSquare,
    href: '/mobileapp/ai/chat',
    color: 'bg-blue-500',
  },
  // {
  //   title: 'AI QnA',
  //   description: '성경에 대한 질문에 AI가 답변해드립니다',
  //   icon: HelpCircle,
  //   href: '/bible/qna',
  //   color: 'bg-green-500',
  // },
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

  useEffect(() => {
    const getToken = async () => {
      const token = await getTokenFromApp();
      setToken(token);
    };
    getToken();
  }, []);
  // useEffect(() => {
  //   const getTokenFromApp = (): Promise<string | null> => {
  //     // Android
  //     if (window.JSBridge) {
  //       return Promise.resolve(window.JSBridge.getToken());
  //     }
  //     // iOS
  //     if (window.webkit?.messageHandlers?.getToken) {
  //       return new Promise((resolve) => {
  //         window.webkit!.messageHandlers.getToken.postMessage({
  //           callback: (token: string) => resolve(token)
  //         });
  //       });
  //     }
  //     return Promise.resolve(null);
  //   };


  // }, []);
  
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

  return (
    <div className="min-h-screen bg-gray-100">
      <MobileDefaultNavbar onBackClick={handleNavbarBackEvent} />
      <div className="p-4">
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
          <p>토큰: {token}</p>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 mt-6">
          {aiFeatures.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
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
    </div>
  );
}