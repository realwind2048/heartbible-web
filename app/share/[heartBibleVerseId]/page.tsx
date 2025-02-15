'use client'

import { VerseCardForProp } from '../../components/VerseCardForProp'
import { Suspense } from 'react'
import { getHeartBibleVerse } from '../../lib/firebase/RealtimeDatabase'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
/**
 * 정보를 받아서 VerseCard 컴포넌트를 렌더링하는 페이지
 */
export default function Page() {
  const params = useParams();
  const heartBibleVerseId = Number(params.heartBibleVerseId);
  console.log('heartBibleVerseId:', heartBibleVerseId);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    console.log('Page useEffect');
    getHeartBibleVerse(heartBibleVerseId)
    .then((data) => {
      console.log('Verse 0:', data);
      setData(data);
    })
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {data ? <VerseCardForProp verseString={data.verseKo} indexString={`${data.bookKo} ${data.indexKo}`} /> : <div>Loading...</div>}
    </Suspense>
  )
}