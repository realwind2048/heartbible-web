// TODO FIX Module not found: Can't resolve 'fs' 
// use client 와 sqlite3 를 사용하면 발생하는 에러
'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getVersesFromFreeBible } from '@/app/domain/usecase/FreeBibleUseCase'

interface Verse {
  id: number;
  book: number;
  chapter: number;
  verse: number;
  content: string;
}

export default async function Page() {
  const params = useParams();
  const book = Number(params.book);
  const chapter = Number(params.chapter);
  console.log('book:', book, `chapter:`, chapter);

  const [verses, setData] = useState<Verse[] | null>(null)

  useEffect(() => {
    console.log('Page useEffect');
    getVersesFromFreeBible().then((verses) => {
      setData(verses);
    });
  }, [])

  return (
    <>
      <div className="flex flex-col gap-4 justify-center gap-4 px-5 md:px-10"> 
            {verses && verses.map((verse) => (
                <div className="flex" key={verse.id}>
                    <h1 className="size-10 flex-non">{verse.book}</h1>
                    <h2 className="size-10 flex-non">{verse.chapter}</h2>
                    <p className="size-10 flex-non">{verse.verse}</p>
                    <p className="size-10 flex-grow">{verse.content}</p>
                </div>
            ))}
      </div>
    </>
  )
}