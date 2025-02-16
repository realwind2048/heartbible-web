'use client'

import Image from 'next/image';
import { HeratBibleSignTextLogo } from './HeartBibleSignTextLogo';
import { ShareButton } from './ShareButton';
import { getRandomBackgroundImageSrc } from '../lib/BackgroundUseCase';
import { useEffect, useState } from 'react'

export function VerseCardForRandom() {
    // create random verseString
    const verseString = "예수께서 대답하여 이르시되 진실로 진실로 내게 이르노니 사람이 거듭나지 아니하면 하나님의 나라를 볼 수 없느니라"
    // create random indexString
    const indexString = "요한복음 3:3"
    // get Random imageSrc from /image/bg folder files
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        console.log('Page useEffect');
        setImageSrc(getRandomBackgroundImageSrc());
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
                            {verseString}
                        </div>
                        <hr className="w-10 h-px mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700"></hr>
                        <p className="text-white text-base">
                            {indexString}
                        </p>
                    </div>
                </div>
            </div>
            <HeratBibleSignTextLogo />
            <ShareButton />
        </div>
    );
  }