'use client'

// use serchParams to get the imageSrc from the URL
// https://nextjs.org/docs/app/api-reference/functions/use-search-params
import { useSearchParams } from 'next/navigation'
import { VerseCard } from '../../components/VerseCard'

/**
 * id 를 받아서 VerseCard 컴포넌트를 렌더링하는 페이지
 * TODO : id 를 받아서 해당 id 에 맞는 이미지와 구절을 렌더링하도록 수정
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