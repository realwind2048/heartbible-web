'use client';

import { useEffect } from 'react';

interface AdsenseProps {
  client: string;  // Google AdSense 클라이언트 ID
  slot: string;    // 광고 슬롯 ID
  style?: React.CSSProperties;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  responsive?: boolean;
  className?: string;
}

export default function Adsense({
  client,
  slot,
  style,
  format = 'auto',
  responsive = true,
  className = '',
}: AdsenseProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Adsense 에러:', err);
    }
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}