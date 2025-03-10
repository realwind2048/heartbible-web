import { VerseCardForProp } from '@/app/components/VerseCardForProp'
import { getRandomBackgroundId, getRandomBackgroundImageSrcFromBgId } from '@/app/lib/BackgroundUseCase'
import { getVersesFromFreeBible, fetchBookNameFromId } from '@/app/domain/usecase/FreeBibleUseCase'

interface VerseData {
  id: number;
  book: number;
  chapter: number;
  verse: number;
  content: string;
}

interface ShareParams {
  book: number;
  chapter: number;
  verses: string; // 콤마로 구분된 절 번호들
  bg?: string;
  pt?: string;
}

export default async function Page({
  searchParams
}: {
  searchParams: Promise<ShareParams>
}) {
  const { book, chapter, verses, bg, pt } = await searchParams;
  
  // 배경 및 파티클 효과 설정
  const bgId: string = bg || String(getRandomBackgroundId());
  const imageSrc = getRandomBackgroundImageSrcFromBgId(bgId);
  const particlesId = pt || '';

  console.log('verses:', verses);

  // 선택된 절 번호들을 배열로 변환
  const selectedVerses = verses.split(',').map(Number);
  
  console.log('selectedVerses:', selectedVerses);
  console.log('book:', book);
  console.log('chapter:', chapter);
  // 해당 장의 모든 구절을 가져옴
  const allVerses: VerseData[] = await getVersesFromFreeBible(book, chapter);
  
  // 선택된 구절들만 필터링
  const filteredVerses = allVerses.filter(verse => selectedVerses.includes(verse.verse));
  
  // 구절들을 하나의 문자열로 합침
  const verseString = filteredVerses.length === 1 
    ? filteredVerses[0].content
    : filteredVerses
        .map(verse => `(${verse.verse}) ${verse.content}`)
        .join(' ');

  // 책 이름 가져오기
  const bookName = fetchBookNameFromId(book);

  // 참조 문자열 생성 (예: "창세기 1:1-3")
  const verseNumbers = selectedVerses
    .sort((a, b) => a - b) // 오름차순 정렬
    .reduce((acc: string[], curr: number, i: number, arr: number[]) => {
      if (i === 0) return [curr.toString()];
      
      const prev = arr[i-1];
      const last = acc[acc.length-1];
      
      // 연속된 숫자인 경우
      if (curr === prev + 1) {
        // 이미 범위가 시작된 경우
        if (last.includes('~')) {
          acc[acc.length-1] = last.split('~')[0] + '~' + curr;
        } else {
          // 새로운 범위 시작
          acc[acc.length-1] = prev + '~' + curr;
        }
      } else {
        // 연속되지 않은 경우 새로운 숫자 추가
        acc.push(curr.toString());
      }
      return acc;
    }, [])
    .join(',');

  const indexString = `${bookName} ${chapter}:${verseNumbers}`;

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const shareUrl = `${origin}/share/bible/nkrv?book\=${book}&chapter=${chapter}&verses=${verses}&bg=${bgId}&pt=${particlesId}`;

  return (
    <VerseCardForProp 
      verseString={verseString}
      indexString={indexString}
      imageSrc={imageSrc}
      particlesId={particlesId}
      shareUrl={shareUrl}
    />
  );
}
