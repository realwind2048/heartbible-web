'use client'

import { useState } from 'react';
import { MobileDefaultNavbar } from '@/app/mobileapp/component/navbar/MobileDefaultNavbar';

const dummyQnA = [
  {
    title: 'AI가 인간의 일자리를 대체할까요?',
    summary: 'AI 기술이 발전하면서 일자리 시장에 미치는 영향에 대해 궁금합니다. 어떤 직종이 가장 영향받을까요?',
    time: '2시간 전',
  },
  {
    title: '딥러닝과 머신러닝의 차이점은?',
    summary: 'AI를 공부하면서 가장 기본적인 개념인데 아직도 헷갈립니다. 쉽게 설명해주실 수 있나요?',
    time: '3시간 전',
  },
  {
    title: 'ChatGPT API 사용 방법',
    summary: 'ChatGPT API를 이용해서 서비스를 만들고 싶은데 어떻게 시작해야 할까요? 기본적인 설명 부탁드립니다.',
    time: '4시간 전',
  },
];

export default function AIQnAPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <MobileDefaultNavbar />
      {/* 상단 타이틀 */}
      <div className="px-4 pt-4 pb-2 bg-white shadow-sm sticky top-0 z-10">
        <div className="text-xl font-semibold mb-2">AI Q&A</div>
        {/* 검색창 */}
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="질문을 입력하세요"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Q&A 리스트 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {dummyQnA.map((qna, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-4 flex flex-col relative"
          >
            <div className="font-semibold text-base mb-1">{qna.title}</div>
            <div className="text-gray-600 text-sm mb-1 line-clamp-2">{qna.summary}</div>
            <div className="text-xs text-gray-400 mt-1">{qna.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 