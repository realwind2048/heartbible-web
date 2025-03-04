'use client'

import { ShareIcon } from '@/components/ShareIcon';

const handle = (shareUrl: string) => {
    console.log('shareUrl:', shareUrl);
    if (navigator.share) {
        navigator.share({
            title: '마음말씀',
            text: '말씀 카드가 도착했어요',
            url: shareUrl,
        });
    } else {
        alert("공유하기가 지원되지 않는 환경 입니다. 주소를 공유해보세요.");
        // TODO 카카오톡에서 여기로 옴. 복사하기로 해야할까.. 고민
        // 카카오톡 공유하기
        // 페이스북 공유하기 등등 있으면 좋을 듯
    }
  }

export function ShareHeartBibleVerseButton({ shareUrl }: { shareUrl: string }) {
    return (
        <button 
            className="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 shadow-xl shadow-neutral-500/20 transition active:scale-95"
            onClick={() => { handle(shareUrl) }}>
            <ShareIcon />
            <span className="ml-3">공유하기</span>
        </button>
    );
  }