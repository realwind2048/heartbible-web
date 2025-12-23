
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ShareLayoutProps {
  children: ReactNode;
}

export default function ShareLayout({ children }: ShareLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col items-center max-w-lg p-8 sm:p-12">
          <Image
            src="/images/icon/ic_app_icon.png"
            alt="HeartBible Logo"
            width={128}
            height={128}
            className="mb-6"
          />
          {children}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs mt-8">
            <Link href="#" passHref className="flex-1">
                <div className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  App Store
                </div>
            </Link>
            <Link href="#" passHref className="flex-1">
              <div className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                  Google Play
              </div>
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full h-20 flex items-center justify-center border-t mt-8">
        <p className="text-gray-500">
          © {new Date().getFullYear()} HeartBible. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
