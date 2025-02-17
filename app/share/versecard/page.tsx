'use client'

import { VerseCardForRandom } from '../../components/VerseCardForRandom'
import { Suspense } from 'react'

/**
 * 정보를 받아서 VerseCard 컴포넌트를 렌더링하는 페이지
 */
export default function Page() {
  // TODO FIXME heartBibleVerse 는 랜덤으로 보여주므로 공유하기할 때 URL 을 공유하면 받은 사람은 다른 정보가 보임..
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerseCardForRandom />
    </Suspense>
  )
}