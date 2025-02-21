import Image from 'next/image';
import Link from 'next/link';

export function HeratBibleMainSignTextLogo() {
    return (
        <Link
            href="/">
            <div className="flex items-center p-5">
                <p className="text-xl text-black">마음말씀</p>
                <Image 
                    src="/images/icon/ic_app_icon_transparent_bg.png" 
                    width={25} 
                    height={25} 
                    alt="Heart Bible Logo"/>
            </div>
        </Link>
    );
  }