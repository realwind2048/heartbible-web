'use client'

// use serchParams to get the imageSrc from the URL
// https://nextjs.org/docs/app/api-reference/functions/use-search-params
import { useSearchParams } from 'next/navigation'
import { VerseCard } from '../../components/VerseCard'

/**
 * 정보를 받아서 VerseCard 컴포넌트를 렌더링하는 페이지
 */
export default function Page() {
  const searchParams = useSearchParams()
  const search = searchParams.get('imageSrc')
  const verseString = searchParams.get('verseString')
  const indexString = searchParams.get('indexString')
  return (
    <VerseCard 
      imageSrc={search} 
      verseString={verseString} 
      indexString={indexString}/>
  )
}