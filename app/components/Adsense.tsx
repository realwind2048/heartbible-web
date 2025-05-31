'use client';

// 테스트 기기 ID 목록
const TEST_DEVICE_IDS = [
  'da44ec65-95ce-4df5-8e32-1e8905ca288f', // 애뮬레이터 (memium phone api 34, pc)
  '2a4d5e23-18db-4eb4-8da1-43e78dfced5d', // 실제 기기 s24 ultra
  '4ddb03ac-a02c-44cd-9b26-63b46484c4f9', // 실제 기기 a53
  // 실제 테스트 기기 ID를 여기에 추가
];

interface AdsenseProps {
  client: string;  // Google AdSense 클라이언트 ID
  slot: string;    // 광고 슬롯 ID
  style?: React.CSSProperties;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  responsive?: boolean;
  className?: string;
  adid?: string;   // 테스트 기기 ID
  shouldShowAd?: boolean;
}

export default function Adsense({
  client,
  slot,
  style,
  format = 'auto',
  responsive = true,
  className = '',
  adid,
  shouldShowAd = true
}: AdsenseProps) {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  if (!shouldShowAd) return null;

  // 테스트 기기인 경우 placeholder 표시
  if (adid && TEST_DEVICE_IDS.includes(adid)) {
    return (
      <div className={`adsense-container ${className}`}>
        <div 
          className="w-full bg-gray-100 rounded-lg p-4 text-center"
          style={{ minHeight: '100px', ...style }}
        >
          <p className="text-gray-500 text-sm">테스트 광고 영역</p>
          <p className="text-gray-400 text-xs mt-1">AdID: {adid}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`adsense-container ${className}`}>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1576539061828377"
        crossOrigin="anonymous"></script>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  );
}