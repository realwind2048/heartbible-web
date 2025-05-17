'use client'

import { usePathname, useRouter } from 'next/navigation';

interface MobileDefaultNavbarProps {
  onBackClick?: () => void; // 뒤로가기 버튼 클릭 시 호출될 콜백 함수
}

export function MobileDefaultNavbar({ onBackClick }: MobileDefaultNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  // 경로에 따른 현재 페이지 제목 생성
  const getCurrentPageTitle = (): string => {
    const segments = pathname.split('/').filter(Boolean);
    
    if (segments.length === 0) {
      return '홈'; // 기본 페이지 제목 (예: 루트 경로)
    }
    
    const lastSegment = segments[segments.length - 1];
    let label = lastSegment;
    
    // 경로에 따른 한글 레이블 매핑
    switch (lastSegment) {
      case 'qna':
        label = '말씀 길잡이 Q&A';
        break;
      case 'ai':
        label = '말씀 길잡이';
        break;
      case 'chat':
        label = '말씀 길잡이 AI 채팅';
        break;
      case 'share':
        label = '공유';
        break;
      case 'settings':
        label = '설정';
        break;
      case 'sermons':
        label = '설교 말씀 요약';
        break;
      // 다른 특정 경로에 대한 레이블 추가 가능
      default:
        // Default label is the last segment itself, capitalized if needed
        label = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }
    
    return label;
  };

  const pageTitle = getCurrentPageTitle();

  const handleBackClick = () => {
    router.back();
    // onBackClick 콜백이 있으면 호출
    if (onBackClick) {
      onBackClick();
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBackClick}
            className="text-gray-600 hover:text-gray-900 flex items-center"
            aria-label="뒤로 가기"
          >
            {/* Heroicon name: chevron-left (outline) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="ml-1 sm:hidden">뒤로</span> {/* Hide text on small screens if icon is enough */}
          </button>
          
          <div className="flex-grow text-center">
            <span className="text-lg font-semibold text-gray-900">
              {pageTitle}
            </span>
          </div>
          
          {/* Placeholder for potential right-side icons/buttons, ensures title is centered */}
          <div className="w-6 h-6"></div> {/* Adjust width to match back button icon for balance */}
        </div>
      </div>
    </nav>
  );
} 