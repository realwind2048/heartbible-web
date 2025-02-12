import Image from 'next/image';
import { ShareIcon } from './ShareIcon';

export function ShareButton() {
    return (
        <div className="absolute flex w-full bottom-40 items-center justify-center p-5">
            <button 
                className="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95"
                onClick={() => {alert("test");}}>
                <ShareIcon />
                <span className="ml-3">공유하기</span>
            </button>
        </div>
    );
  }