'use client'

import { useEffect, useState } from 'react';
import { ShareIcon } from './ShareIcon';
import { usePathname } from 'next/navigation'

const handle = (currentPath: string) => {
    console.log('currentPath:', currentPath);
    if (navigator.share) {
        navigator.share({
            title: '마음말씀',
            text: '마음말씀 카드 공유',
            url: currentPath,
        });
    } else {
        alert("공유하기가 지원되지 않는 환경 입니다.")
    }
  }

export function ShareButton() {
    const [baseUrl, setBaseUrl] = useState<string>("https://heartbible.app");
 
    useEffect(() => {
        console.log('useEffect in ShareButton');
        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        console.log('baseUrl:', baseUrl)
        setBaseUrl(baseUrl);
    }, [])
    
    const path = usePathname();
    console.log('path in ShareButton:', path);
    return (
        <div className="absolute flex w-full bottom-40 items-center justify-center p-5">
            <button 
                className="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95"
                onClick={() => { handle(baseUrl + path) }}>
                <ShareIcon />
                <span className="ml-3">공유하기</span>
            </button>
        </div>
    );
  }