import Image from 'next/image';
import { ShareIcon } from './ShareIcon';

export function ShareButton() {
    return (
        <div className="absolute flex w-full bottom-40 items-center justify-center p-5">
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center"
                onClick={() => {alert("test");}}>
                <ShareIcon />
                <span className="ml-3">공유하기</span>
            </button>
        </div>
    );
  }