'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getRandomBackgroundId } from '@/app/lib/BackgroundUseCase';

export interface VerseFeedItemProps {
    verseString: string;
    indexString: string;
}

export function VerseFeedItem({ verseString, indexString }: VerseFeedItemProps) {
    const [bgId, setBgId] = useState<number | null>(null);

    useEffect(() => {
        console.log('Page useEffect');
        setBgId(getRandomBackgroundId());
    }, [])

    return (
        <>
            <Link 
                href={{
                    pathname: `/share/heartbible/random`,
                }}>
                <div className="relative m-auto max-w-sm rounded overflow-hidden shadow-lg">
                    <div 
                        className={`relative top-0 left-0 brightness-50 h-300`} 
                        style={{ aspectRatio: '3/2' }} >
                        <Image 
                            src={bgId ? `/images/bg/bg_${bgId}.webp` : '/images/image_bible.webp'}
                            fill
                            style={{ objectFit: 'cover' }} 
                            alt="VerseCard Background Image"/>
                    </div>
                    <div className="absolute basis-full top-0 left-0">
                        <div className={`m-auto max-w-sm rounded`}>
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
                        <div className="basis-full px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#말씀카드</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#공유</span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
  }