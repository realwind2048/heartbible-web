'use client'

import { getRandomBackgroundImageSrc } from '../lib/BackgroundUseCase';
import { useEffect, useState } from 'react'
import { getRandomHeartBibleVerse } from '../lib/HeartBibleVerseUseCase';
import { VerseCardForProp } from './VerseCardForProp';

export function VerseCardForRandom() {
    // get Random imageSrc from /image/bg folder files
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [data, setData] = useState<VerseData | null>(null)
    interface VerseData {
        verseKo: string;
        bookKo: string;
        indexKo: string;
      }

    useEffect(() => {
        console.log('Page useEffect');
        setImageSrc(getRandomBackgroundImageSrc());
        getRandomHeartBibleVerse()
        .then((data) => {
            console.log('Verse 0:', data);
            setData(data as VerseData);
        })
    }, [])

    return (
        <>
            { data ? 
                <VerseCardForProp 
                    verseString={data.verseKo}
                    indexString={`${data.bookKo} ${data.indexKo}`}
                    imageSrc={ imageSrc ? imageSrc : "/images/bg/bg_1.webp"}/>
                : <div>Loading...</div> }
        </>
    );
  }