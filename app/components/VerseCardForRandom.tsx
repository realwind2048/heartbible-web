'use client'

import Image from 'next/image';
import { HeratBibleSignTextLogo } from './HeartBibleSignTextLogo';
import { ShareButton } from './ShareButton';
import { getRandomBackgroundImageSrc } from '../lib/BackgroundUseCase';
import { useEffect, useState } from 'react'
import { getRandomHeartBibleVerse } from '../lib/HeartBibleVerseUseCase';

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
        <div className="absolute top-0 left-0 w-full h-full text-center">
            <div className={`absolute w-full h-full brightness-50`}>
                { imageSrc ? 
                    <Image 
                        src={imageSrc} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                        alt="VerseCard Background Image" 
                        /> : <div>Loading...</div> }
            </div>
            <div className="absolute top-0 left-0 flex h-screen w-full h-full">
                <div className={`m-auto max-w-sm rounded overflow-hidden`}>
                    <div className="px-6 py-4">
                        <div className="text-xl mb-2 text-white">
                            { data ? data.verseKo : "Loading..." }
                        </div>
                        <hr className="w-10 h-px mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700"></hr>
                        <p className="text-white text-base">
                            { data ? `${data.bookKo} ${data.indexKo}` : "Loading..." }
                        </p>
                    </div>
                </div>
            </div>
            <HeratBibleSignTextLogo />
            <ShareButton />
        </div>
    );
  }