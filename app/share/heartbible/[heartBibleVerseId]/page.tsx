'use client'

import { VerseCardForProp } from '@/app/components/VerseCardForProp'
import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { getRandomBackgroundImageSrcFromBgId } from '@/app/lib/BackgroundUseCase'
import { getHeartBibleVerseById } from '@/app/data/HeartBibleVerses'
/**
 * 정보를 받아서 VerseCard 컴포넌트를 렌더링하는 페이지
 */
export default function Page() {
  const params = useParams();
  const heartBibleVerseId = params ? Number(params.heartBibleVerseId) : 0;
  console.log('heartBibleVerseId:', heartBibleVerseId);

  const searchParams = useSearchParams()
  const imageSrc = searchParams ? getRandomBackgroundImageSrcFromBgId(searchParams.get('bg')) : ''
  const particlesId = searchParams ? searchParams.get('pt') || '' : ''

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
        /> : <div>Loading...</div>
      }
    </Suspense>
  )
}