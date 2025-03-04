'use client'

import Image from 'next/image';
import { HeratBibleSignTextLogo } from './HeartBibleSignTextLogo';
import { ShareHeartBibleVerseButton } from '@/components/share/ShareHeartBibleVerseButton';
import { Particles } from './particles/Particles';
import { VerseCardForPropProps } from '../types/models';

export function VerseCardForProp({ verseString, indexString, imageSrc, particlesId, shareUrl }: VerseCardForPropProps) {
    console.log('VerseCardForProp shareUrl:', shareUrl);
    return (
        <div className="absolute top-0 left-0 w-full h-full text-center">
            <div className={`absolute w-full h-full brightness-50`}>
                <Image 
                    src={imageSrc} 
                    fill
                    style={{ objectFit: 'cover' }} 
                    alt="VerseCard Background Image"/>
            </div>
            <Particles id={particlesId} />
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
                        <div className="py-10 items-center justify-center p-5">
                            <ShareHeartBibleVerseButton 
                                shareUrl={shareUrl}/>
                        </div>
                    </div>
                </div>
            </div>
            <HeratBibleSignTextLogo />
        </div>
    );
  }