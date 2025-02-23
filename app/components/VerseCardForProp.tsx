'use client'

import Image from 'next/image';
import { HeratBibleSignTextLogo } from './HeartBibleSignTextLogo';
import { ShareButton } from './ShareButton';
import { Particles } from './particles/Particles';
export interface VerseCardForPropProps {
    verseString: string;
    indexString: string;
    imageSrc: string;
    particlesId: string;
}

export function VerseCardForProp({ verseString, indexString, imageSrc, particlesId }: VerseCardForPropProps) {
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
                        <ShareButton />
                    </div>
                </div>
            </div>
            <HeratBibleSignTextLogo />
        </div>
    );
  }