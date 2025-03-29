'use client';

import { useEffect, useState, use } from 'react';
import { BreadcrumbNavbar } from '@/app/components/navbar/breadcrumb-navbar';
import { SermonVideo } from '@/app/types/youtube';
import { SermonService } from '@/app/services/SermonService';
import Link from 'next/link';
import { formatDate } from '@/app/lib/format';
import ReactMarkdown from 'react-markdown';
import { ShareButton } from '@/app/components/ShareButton';

export default function SermonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [sermon, setSermon] = useState<SermonVideo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSermon = async () => {
      try {
        setIsLoading(true);
        const data = await SermonService.getSermonById(resolvedParams.id);
        setSermon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '설교 정보를 가져오는데 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSermon();
  }, [resolvedParams.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BreadcrumbNavbar />
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !sermon) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BreadcrumbNavbar />
        <div className="text-center text-red-600 mt-8">
          {error || '설교를 찾을 수 없습니다'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link 
              href="/sermons"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              목록으로 돌아가기
            </Link>
            <ShareButton />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{sermon.title}</h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {sermon.churchName}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <span>{sermon.pastor}</span>
              <span>{formatDate(sermon.date)}</span>
            </div>

            {sermon.bibleVerses && (
              <div className="flex flex-wrap gap-2 mb-6">
                {sermon.bibleVerses.map((verse, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm"
                  >
                    {verse}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-blue max-w-none">
              <h2 className="text-xl font-semibold mb-4">설교 요약</h2>
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>
                  {sermon.summary}
                </ReactMarkdown>
              </div>
            </div>

            {sermon.videoUrl && (
              <div className="mt-8 pt-6 border-t">
                <a 
                  href={sermon.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#FF0000] hover:text-[#CC0000] text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  YouTube에서 전체 설교 보기
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 