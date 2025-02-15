import { VerseCardForQuery } from '../../components/VerseCardForQuery'
import { Suspense } from 'react'

/**
 * 정보를 받아서 VerseCard 컴포넌트를 렌더링하는 페이지
 */
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerseCardForQuery />
    </Suspense>
  )
}