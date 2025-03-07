'use client'

import { getRandomBackgroundId, getRandomBackgroundImageSrcFromBgId } from '@/app/lib/BackgroundUseCase';
import { getRandomParticlesId } from '@/app/lib/ParticlesUseCase';
import { useEffect, useState } from 'react'
import { getRandomHeartBibleVerse } from '@/app/domain/usecase/HeartBibleVerseUseCase';
import Image from 'next/image';
import { Particles } from '@/app/components/particles/Particles';
import { HeratBibleSignTextLogo } from '@/app/components/HeartBibleSignTextLogo';
import { ShareHeartBibleVerseButton } from '@/components/share/ShareHeartBibleVerseButton';

interface VerseData {
  verseKo: string;
  bookKo: string;
  indexKo: string;
  id: number;
}

export default function Page() {
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

  const getShareUrl = () => {
    if (!verse) return '';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}/share/heartbible/${verse.id}?bg=${bgId}&pt=${particlesId}`;
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
    <div className="absolute top-0 left-0 w-full h-full text-center">
      <div className="absolute w-full h-full brightness-50">
        <Image
          src={bgImageSrc}
          alt="배경"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <Particles id={particlesId} />
      <div className="absolute top-0 left-0 flex h-screen w-full h-full">
        <div className="m-auto max-w-sm rounded overflow-hidden">
          <div className="px-6 py-4">
            <div className="text-xl mb-2 text-white">
              {verse.verseKo}
            </div>
            <hr className="w-10 h-px mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700"></hr>
            <p className="text-white text-base">
              {verse.bookKo} {verse.indexKo}
            </p>
            <div className="flex flex-col gap-2 py-10 items-center justify-center p-5">
              <button onClick={handleChangeVerse} className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                다른 말씀 선택
              </button>
              <button onClick={handleChangeBg} className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                다른 배경 선택
              </button>
              <button onClick={handleChangeParticles} className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
                다른 효과 선택
              </button>
              <ShareHeartBibleVerseButton shareUrl={getShareUrl()} />
            </div>
          </div>
        </div>
      </div>
      <HeratBibleSignTextLogo />
    </div>
  );
}