'use client'

import { VerseCardForProp } from '@/app/components/VerseCardForProp'
import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { getRandomBackgroundId, getRandomBackgroundImageSrcFromBgId } from '@/app/lib/BackgroundUseCase'
import { getHeartBibleVerseById } from '@/app/data/HeartBibleVerses'
import { getShareUrl } from '@/app/domain/usecase/HeartBibleVerseUseCase'
/**
 * 정보를 받아서 VerseCard 컴포넌트를 렌더링하는 페이지
 */
export default function Page() {
  const params = useParams();
  const heartBibleVerseId = params ? Number(params.heartBibleVerseId) : 0;
  console.log('heartBibleVerseId:', heartBibleVerseId);

  const searchParams = useSearchParams();
  const bgId: string = searchParams ? searchParams.get('bg') || String(getRandomBackgroundId()) : String(getRandomBackgroundId());
  const imageSrc = getRandomBackgroundImageSrcFromBgId(bgId);
  const particlesId = searchParams ? searchParams.get('pt') || '' : '';
  const shareUrl = getShareUrl(heartBibleVerseId, bgId, particlesId);

  interface VerseData {
    verseKo: string;
    bookKo: string;
    indexKo: string;
  }

  const [data, setData] = useState<VerseData | null>(null)

  useEffect(() => {
    console.log('Page useEffect');
    setData(getHeartBibleVerseById(heartBibleVerseId) as VerseData);
  }, [heartBibleVerseId])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      { data ? 
        <VerseCardForProp 
          verseString={data.verseKo} 
          indexString={`${data.bookKo} ${data.indexKo}`} 
          imageSrc={imageSrc}
          particlesId={particlesId}
          shareUrl={shareUrl}
        /> : <div>Loading...</div>
      }
    </Suspense>
  )
}