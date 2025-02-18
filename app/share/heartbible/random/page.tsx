'use client'

import { redirect } from 'next/navigation'
import { getRandomBackgroundId } from '../../../lib/BackgroundUseCase';
import { useEffect, useState } from 'react'
import { getRandomHeartBibleVerse } from '@/app/lib/HeartBibleVerseUseCase';

/**
 * 랜덤 이미지와 성경 구절을 받아서 공유 페이지로 리다이렉트하는 페이지
 */
export default function Page() {
  // get Random imageSrc from /image/bg folder files
  const [bgId, setBgId] = useState<number | null>(null);
  const [data, setData] = useState<VerseData | null>(null)
  interface VerseData {
      id: number;
      verseKo: string;
      bookKo: string;
      indexKo: string;
    }

  useEffect(() => {
      console.log('Page useEffect');
      setBgId(getRandomBackgroundId());
      getRandomHeartBibleVerse()
      .then((data) => {
          console.log('Verse 0:', data);
          setData(data as VerseData);
      })
  }, [])

  { return data ?
    redirect(`/share/heartbible/${data.id}?bg=${bgId}`)
    : console.log('Loading...')
  }
}