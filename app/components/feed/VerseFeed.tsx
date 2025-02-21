'use client'

import { useEffect, useState } from 'react'
import { VerseFeedItem } from './VerseFeedItem'
import { getRandomHeartBibleVerses } from '@/app/domain/usecase/HeartBibleVerseUseCase'

export function VerseFeed() {
    const [heartBibleVerses, setHeartBibleVerses] = useState<VerseData[]>([]);
    interface VerseData {
        id: number;
        verseKo: string;
        bookKo: string;
        indexKo: string;
      }

    useEffect(() => {
        console.log('VerseFeed useEffect');
        getRandomHeartBibleVerses(10)
        .then((data) => {
            console.log('VerseFeed data:', data);
            setHeartBibleVerses(data as VerseData[]);
        })
    }, [])

    return (
        <>
            {heartBibleVerses.map((verse, index) => (
                <VerseFeedItem verseString={verse.verseKo} indexString={`${verse.bookKo} ${verse.indexKo}`} key={index}/>
            ))}
        </>
    );
  }