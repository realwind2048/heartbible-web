'use client'

import { VerseCardForProp } from './VerseCardForProp';
// use serchParams to get the imageSrc from the URL
// https://nextjs.org/docs/app/api-reference/functions/use-search-params
import { useSearchParams } from 'next/navigation'

export function VerseCardForQuery() {
    const searchParams = useSearchParams()
    const imageSrc = searchParams.get('imageSrc') || '/images/bg/bg_1.webp'
    const verseString = searchParams.get('verseString') || "예수께서 대답하여 이르시되 진실로 진실로 내게 이르노니 사람이 거듭나지 아니하면 하나님의 나라를 볼 수 없느니라"
    const indexString = searchParams.get('indexString') || "요한복음 3:3"
    return (
        <VerseCardForProp 
            verseString={verseString}
            indexString={indexString}
            imageSrc={imageSrc}
            particlesId=''/>
    );
  }