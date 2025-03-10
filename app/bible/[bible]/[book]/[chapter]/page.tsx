import { 
  getVersesFromFreeBible, 
  getBookChapterMap, 
  fetchBookNameFromId,
  getPrevChapterLink,
  getNextChapterLink
} from '@/app/domain/usecase/FreeBibleUseCase'
import { BibleChapterView } from './components/BibleChapterView';

interface Verse {
  id: number;
  book: number;
  chapter: number;
  verse: number;
  content: string;
}

export default async function Page({ params }: { params: Promise<{ book: number, chapter: number }> }) {
  const { book, chapter } = await params;
  const bookName: string = fetchBookNameFromId(book);
  const verses: Verse[] = await getVersesFromFreeBible(book, chapter);
  const prevChapterLink = getPrevChapterLink(book, chapter);
  const nextChapterLink = getNextChapterLink(book, chapter);

  return (
    <BibleChapterView
      bookName={bookName}
      chapter={chapter}
      verses={verses}
      prevChapterLink={prevChapterLink}
      nextChapterLink={nextChapterLink}
    />
  );
}

export async function generateStaticParams() {
  const paths = await getBookChapterMap();
  console.log('paths:', paths);
  return paths.map((path) => ({
      params: {
        book: path.book,
        chapter: path.chapter
      }
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ book: number, chapter: number }>
}) {
  const { book, chapter } = await params
  const bookName: string = await fetchBookNameFromId(book);
  return {
    title: `${bookName} ${chapter}장`,
    description: `성경 ${bookName} ${chapter}장을 읽고 공유해보세요.`,
    openGraph: {
      title: `${bookName} ${chapter}장`,
      description: `성경 ${bookName} ${chapter}장을 읽고 공유해보세요.`,
      type: 'article',
      images: [
        {
          url: '/images/icon/icon_app_icon.png',
          width: 1200,
          height: 630,
          alt: 'HeartBible',
        },
      ],
    },
    alternates: {
      canonical: `/bible/nkrv/${book}/${chapter}`
    }
  }
}