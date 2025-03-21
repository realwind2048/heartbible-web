import { VerseCardForProp } from '@/app/components/VerseCardForProp'
import { getRandomBackgroundId, getRandomBackgroundImageSrcFromBgId } from '@/app/lib/BackgroundUseCase'
import { getHeartBibleVerse, getShareUrl } from '@/app/domain/usecase/HeartBibleVerseUseCase'
import { OG_IMAGE_URL } from '@/libs/constants';
/**
 * 정보를 받아서 VerseCard 컴포넌트를 렌더링하는 페이지
 */
export default async function Page({
  params, 
  searchParams
}: {
  params: Promise<{ heartBibleVerseId: number }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { heartBibleVerseId } = await params;
  const heartBibleVerseIdNumber: number = Number(heartBibleVerseId);
  console.log('heartBibleVerseIdNumber:', heartBibleVerseIdNumber);

  const { bg, pt }: { bg?: string; pt?: string } = await searchParams;
  const bgId: string = bg || String(getRandomBackgroundId());
  // const ptId: string = pt || '';
  const imageSrc = getRandomBackgroundImageSrcFromBgId(bgId);
  const particlesId = pt || '';
  // const particlesId = getParticlesId(ptId); // TODO 나중에 particlesId를 받아오는 로직을 추가해야함
  const shareUrl = getShareUrl(heartBibleVerseIdNumber, bgId, Number(particlesId));

  interface VerseData {
    verseKo: string;
    bookKo: string;
    indexKo: string;
  }

  const data = await getHeartBibleVerse(heartBibleVerseIdNumber) as VerseData;
  console.log('data:', data);
  console.log('shareUrl:', shareUrl);
  return (
      <VerseCardForProp 
        verseString={data.verseKo} 
        indexString={`${data.bookKo} ${data.indexKo}`} 
        imageSrc={imageSrc}
        particlesId={particlesId}
        shareUrl={shareUrl}
      />
  )
}

export async function generateMetadata() {
  return {
    title: `말씀카드 - 마음말씀`,
    description: `성경 말씀을 읽고 공유해보세요.`,
    openGraph: {
      type: 'article',
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'HeartBible',
        },
      ],
    },
  }
}
