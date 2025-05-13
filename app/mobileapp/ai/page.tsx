'use client';

import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">말씀 길잡이</h1>
        <div className="grid grid-cols-1 gap-4">
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