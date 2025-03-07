'use client'

import { getRandomBackgroundId, getRandomBackgroundImageSrcFromBgId } from '@/app/lib/BackgroundUseCase';
import { getRandomParticlesId } from '@/app/lib/ParticlesUseCase';
import { useEffect, useState } from 'react'
import { getRandomHeartBibleVerse } from '@/app/domain/usecase/HeartBibleVerseUseCase';
import Image from 'next/image';
import { Particles } from '@/app/components/particles/Particles';
import { useRouter } from 'next/navigation';

interface VerseData {
  verseKo: string;
  bookKo: string;
  indexKo: string;
  id: number;
}

export default function Page() {
  const router = useRouter();
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [bgId, setBgId] = useState<string>(getRandomBackgroundId().toString());
  const [particlesId, setParticlesId] = useState<string>(getRandomParticlesId().toString());
  const [bgImageSrc, setBgImageSrc] = useState<string>('');

  useEffect(() => {
    const fetchRandomVerse = async () => {
      const randomVerse = await getRandomHeartBibleVerse() as VerseData;
      setVerse(randomVerse);
    };
    fetchRandomVerse();
  }, []);

  useEffect(() => {
    setBgImageSrc(getRandomBackgroundImageSrcFromBgId(bgId));
  }, [bgId]);

  const handleShare = () => {
    if (!verse) return;
    const shareUrl = `/share/heartbible/${verse.id}?bg=${bgId}&pt=${particlesId}`;
    router.push(shareUrl);
  };

  const handleChangeBg = () => {
    setBgId(getRandomBackgroundId().toString());
  };

  const handleChangeParticles = () => {
    setParticlesId(getRandomParticlesId().toString());
  };

  const handleChangeVerse = async () => {
    const newVerse = await getRandomHeartBibleVerse() as VerseData;
    setVerse(newVerse);
  };

  if (!verse) return <div>로딩중...</div>;

  return (
    <div className="relative min-h-screen w-full">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImageSrc}
          alt="배경"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* 파티클 효과 */}
      <div className="absolute inset-0 z-10">
        <Particles id={particlesId} />
      </div>

      {/* 컨텐츠 */}
      <div className="relative z-20 flex flex-col items-center gap-4 p-4 min-h-screen bg-black bg-opacity-30">
        <div className="flex flex-col gap-2">
          <button onClick={handleChangeVerse} className="px-4 py-2 bg-blue-500 text-white rounded">
            다른 말씀 선택
          </button>
          <button onClick={handleChangeBg} className="px-4 py-2 bg-green-500 text-white rounded">
            다른 배경 선택
          </button>
          <button onClick={handleChangeParticles} className="px-4 py-2 bg-purple-500 text-white rounded">
            다른 효과 선택
          </button>
          <button onClick={handleShare} className="px-4 py-2 bg-red-500 text-white rounded">
            공유하기
          </button>
        </div>
        <div className="text-center text-white">
          <p className="text-xl font-bold">{verse.verseKo}</p>
          <p className="text-lg">{verse.bookKo} {verse.indexKo}</p>
        </div>
      </div>
    </div>
  );
}