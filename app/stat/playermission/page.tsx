'use client';

import { useState } from 'react';

interface RankItem {
  rank: number;
  name: string;
  value: number;
  unit: string;
}

// 더미 데이터
const dummyData = {
  totalPlayTime: [
    { rank: 1, name: "김성도", value: 120, unit: "시간" },
    { rank: 2, name: "이영희", value: 98, unit: "시간" },
    { rank: 3, name: "박지성", value: 85, unit: "시간" },
    // ... 나머지 데이터
  ],
  totalVersePlay: [
    { rank: 1, name: "김성도", value: 1500, unit: "절" },
    { rank: 2, name: "이영희", value: 1200, unit: "절" },
    { rank: 3, name: "박지성", value: 1000, unit: "절" },
    // ... 나머지 데이터
  ],
  singlePlayTime: [
    { rank: 1, name: "김성도", value: 5, unit: "시간" },
    { rank: 2, name: "이영희", value: 4, unit: "시간" },
    { rank: 3, name: "박지성", value: 3, unit: "시간" },
    // ... 나머지 데이터
  ],
  singleVersePlay: [
    { rank: 1, name: "김성도", value: 100, unit: "절" },
    { rank: 2, name: "이영희", value: 80, unit: "절" },
    { rank: 3, name: "박지성", value: 70, unit: "절" },
    // ... 나머지 데이터
  ],
  totalPlayCount: [
    { rank: 1, name: "김성도", value: 500, unit: "회" },
    { rank: 2, name: "이영희", value: 450, unit: "회" },
    { rank: 3, name: "박지성", value: 400, unit: "회" },
    // ... 나머지 데이터
  ],
};

function RankCard({ title, data }: { title: string; data: RankItem[] }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.rank} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
            <div className="flex items-center gap-3">
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-semibold
                ${item.rank === 1 ? 'bg-yellow-400 text-white' :
                  item.rank === 2 ? 'bg-gray-300 text-white' :
                  item.rank === 3 ? 'bg-amber-700 text-white' :
                  'bg-gray-100 text-gray-600'}`}>
                {item.rank}
              </span>
              <span className="font-medium text-gray-700">{item.name}</span>
            </div>
            <span className="text-gray-600">
              {item.value.toLocaleString()} {item.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">플레이어 미션 순위</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RankCard 
            title="가장 오랜 시간 플레이 TOP 10" 
            data={dummyData.totalPlayTime} 
          />
          <RankCard 
            title="가장 많은 절 플레이 TOP 10" 
            data={dummyData.totalVersePlay} 
          />
          <RankCard 
            title="한 번에 가장 오랜 시간 플레이 TOP 10" 
            data={dummyData.singlePlayTime} 
          />
          <RankCard 
            title="한 번에 가장 많은 절 플레이 TOP 10" 
            data={dummyData.singleVersePlay} 
          />
          <RankCard 
            title="전체 플레이 횟수 TOP 10" 
            data={dummyData.totalPlayCount} 
          />
        </div>
      </div>
    </div>
  );
}

