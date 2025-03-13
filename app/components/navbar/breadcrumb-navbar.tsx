'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function BreadcrumbNavbar() {
  const pathname = usePathname();
  
  // 경로에 따른 브레드크럼 아이템 생성
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    
    // 필요한 경로만 필터링
    const validPaths = paths.filter(path => 
      ['bible', 'chat', 'share', 'settings'].includes(path)
    );
    
    return validPaths.map((path, index) => {
      const href = '/' + validPaths.slice(0, index + 1).join('/');
      let label = path;
      
      // 경로에 따른 한글 레이블 매핑
      switch (path) {
        case 'bible':
          label = '성경';
          break;
        case 'chat':
          label = '말씀 도우미';
          break;
        case 'share':
          label = '공유';
          break;
        case 'settings':
          label = '설정';
          break;
        default:
          label = path;
      }
      
      return { label, href };
    });
  };

  const items = getBreadcrumbItems();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-gray-900">마음말씀</span>
            <Image 
              src="/images/icon/ic_app_icon_transparent_bg.png" 
              width={30} 
              height={30} 
              alt="Heart Bible Logo"
            />
          </Link>
          
          <div className="flex items-center space-x-1 ml-1">
            {items.map((item, index) => (
              <div key={index} className="flex items-center">
                {index >= 0 && <span className="text-gray-400 mx-2">{`>`}</span>}
                {item.href ? (
                  <Link 
                    href={item.href} 
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <span className="text-sm">{item.label}</span>
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium text-sm">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 