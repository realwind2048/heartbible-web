import Image from 'next/image';
import Link from 'next/link';

export function HeratBibleSignTextLogo() {
    return (
        <Link
            href="/">
            <div className="absolute flex items-center p-5">
                <p className="text-xl text-white">마음말씀</p>
                <Image 
                    src="/images/icon/ic_app_icon_transparent_bg.png" 
                    width={25} 
                    height={25} 
                    alt="Heart Bible Logo"/>
            </div>
        </Link>
    );
  }