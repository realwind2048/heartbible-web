'use client'

import { useEffect, useRef } from 'react';
import { useChat } from 'ai/react';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export default function BibleChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/bible/chat',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">말씀 도우미</h1>
          <p className="mt-1 text-sm text-gray-500">성경 말씀에 대해 물어보세요</p>
        </div>
      </div>

      {/* 채팅 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex ${
              message.role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === 'assistant'
                  ? 'bg-white text-gray-800 shadow'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <form onSubmit={handleSubmit} className="border-t bg-white p-4">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="성경 말씀에 대해 물어보세요..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            전송
          </button>
        </div>
      </form>
    </div>
  );
} 