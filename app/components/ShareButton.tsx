'use client'

import { useEffect, useState } from 'react';
import { ShareIcon } from './ShareIcon';

const handle = (currentUrl: string) => {
    console.log('currentUrl:', currentUrl);
    if (navigator.share) {
        navigator.share({
            title: '마음말씀',
            text: '성경 말씀이 도착했어요',
            url: currentUrl,
        });
    } else {
        alert("공유하기가 지원되지 않는 환경 입니다. 주소를 공유해보세요.");
        // TODO 카카오톡에서 여기로 옴. 복사하기로 해야할까.. 고민
    }
  }

export function ShareButton() {
    const [href, setHref] = useState<string>("https://heartbible.app/versescard");
 
    useEffect(() => {
        console.log('useEffect in ShareButton');
        const href = `${window.location.href}`;
        console.log('href:', href)
        setHref(href);
    }, [])
    
    return (
        <div className="py-10 items-center justify-center p-5">
            <button 
                className="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 shadow-xl shadow-neutral-500/20 transition active:scale-95"
                onClick={() => { handle(href) }}>
                <ShareIcon />
                <span className="ml-3">공유하기</span>
            </button>
        </div>
    );
  }