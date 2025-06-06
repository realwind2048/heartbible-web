'use client'

import { useEffect, useRef, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { MobileDefaultNavbar } from '@/app/mobileapp/component/navbar/MobileDefaultNavbar';
import { useSearchParams } from 'next/navigation';
import { useWebviewParams } from '@/app/hooks/useWebviewParams';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIQnAPage() {
  const searchParams = useSearchParams();
  const verse = searchParams.get('verse');
  const [query, setQuery] = useState(verse ? `${verse}에 대해 설명해주세요.` : '');
  const initialQuerySent = useRef(false);
  const { token: webviewToken, adid, lang, versioncode } = useWebviewParams();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(!!verse);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const welcomeText = `안녕하세요! 저는 성경 말씀을 이해하는 데 도움을 드리는 AI 말씀 길잡이입니다. 성경 말씀에 대해 궁금하신 점이 있다면 언제든 물어보세요!`;

  useEffect(() => {
    if (verse) {
      setQuery(`${verse}에 대해 설명해주세요.`);
    }
  }, [verse]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // 한 글자씩 타이핑 효과로 assistant 메시지를 표시하는 함수
  const typeAssistantMessage = useCallback((fullText: string) => {
    setIsTyping(true);
    let currentIndex = 0;

    const typeMessage = () => {
      if (currentIndex < fullText.length) {
        setMessages(prev => [
          ...prev.filter(msg => msg.id !== 'typing-message'),
          {
            id: 'typing-message',
            role: 'assistant',
            content: fullText.slice(0, currentIndex + 1)
          }
        ]);
        currentIndex++;
        setTimeout(typeMessage, 15);
      } else {
        setIsTyping(false);
        setMessages(prev => [
          ...prev.filter(msg => msg.id !== 'typing-message'),
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: fullText
          }
        ]);
      }
    };

    typeMessage();
  }, [setMessages, setIsTyping]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai-chat/ai-chat-v1-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: webviewToken,
          adid: adid || '',
          lang: lang || 'ko',
          appVersionCode: versioncode || '',
          message: query,
        }),
      });

      if (!response.ok) throw new Error('API 요청 실패');

      const data = await response.json();
      typeAssistantMessage(data.aiMessage);

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: '죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [query, isLoading, webviewToken, adid, lang, versioncode, typeAssistantMessage, setMessages, setQuery, setIsLoading]);

  useEffect(() => {
    if (verse && !initialQuerySent.current && webviewToken) {
      initialQuerySent.current = true;
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSubmit(fakeEvent);
    }

    const hasSeenGuide = localStorage.getItem('hasSeenChatGuide');
    if (!hasSeenGuide) {
      setShowGuide(true);
      localStorage.setItem('hasSeenChatGuide', 'true');
    }

    // 환영 메시지가 아직 표시되지 않았고, 메시지가 없으며, 초기 쿼리도 없는 경우에만 실행
    if (!hasShownWelcome && messages.length === 0 && !verse) {
      setHasShownWelcome(true);
      setIsTyping(true);
      let currentIndex = 0;
      
      const typeMessage = () => {
        if (currentIndex < welcomeText.length) {
          setMessages([
            {
              id: 'welcome-message',
              role: 'assistant',
              content: welcomeText.slice(0, currentIndex + 1)
            }
          ]);
          currentIndex++;
          setTimeout(typeMessage, 15);
        } else {
          setIsTyping(false);
        }
      };

      typeMessage();
    }
  }, [messages.length, hasShownWelcome, setMessages, query, handleSubmit, welcomeText, webviewToken, verse, adid]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <MobileDefaultNavbar />
      {/* 도움말 버튼 */}
      <button
        onClick={() => setShowGuide(!showGuide)}
        className="fixed top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center hover:bg-gray-400 transition-colors shadow-md"
        aria-label="도움말"
      >
        ?
      </button>

      {showGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <div className="flex flex-col space-y-4">
              <div className="text-blue-800">
                <p className="font-medium text-lg">말씀 길잡이란?</p>
                <p className="mt-2">성경 말씀에 대한 질문에 AI가 답변을 제공하는 도구입니다. 성경 구절의 의미, 배경, 적용 등을 이해하는 데 도움을 드립니다.</p>
              </div>
              <div className="text-red-800">
                <p className="font-medium text-lg">주의사항</p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>AI의 답변은 참고용이며, 신앙의 기준이 될 수 없습니다.</li>
                  <li>교리나 신학적 해석에 대해서는 반드시 목회자나 신학자와 상담하시기 바랍니다.</li>
                  <li>AI는 완벽하지 않으며, 오류가 있을 수 있습니다.</li>
                  <li>성경 말씀은 직접 읽고 묵상하는 것이 가장 중요합니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  ? 'bg-white text-gray-800 shadow prose prose-sm'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {message.role === 'assistant' ? (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-gray-500">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="sticky bottom-0 border-t bg-white p-2 sm:p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
          <div className="flex gap-2 sm:gap-4 items-center">
            <input
              value={query}
              onChange={handleInputChange}
              placeholder={isTyping ? "잠시만 기다려주세요..." : "성경 말씀에 대해 물어보세요..."}
              className="flex-1 min-w-0 rounded-lg border border-gray-300 px-3 py-2 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 sm:px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed flex-shrink-0"
              disabled={isTyping}
            >
              전송
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 