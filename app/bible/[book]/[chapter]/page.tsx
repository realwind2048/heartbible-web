import { getVersesFromFreeBible, getBookChapterMap, fetchBookNameFromId } from '@/app/domain/usecase/FreeBibleUseCase'

interface Verse {
  id: number;
  book: number;
  chapter: number;
  verse: number;
  content: string;
}

export default async function Page({ params }: { params: Promise<{ book: number, chapter: number }> }) {
  const { book, chapter } = await params;
  const bookName: string = await fetchBookNameFromId(book);
  const verses: Verse[] = await getVersesFromFreeBible(book, chapter);
  return (
    <>
      <div className="flex flex-col gap-2 justify-center p-5 md:p-10"> 
            <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">개역개정</span>
            <div className="flex gap-2 justify-center p-2 md:p-4">
              <h1 className="basis-auto">{bookName}</h1>
              <h2 className="basis-auto">{chapter}</h2>
            </div>
            <ol className="list-none">
              {verses.map((verse) => (
                    <li key={verse.id}>
                      <div className="flex">
                          <p className="basis-8">{verse.verse}</p>
                          <p className="basis-full">{verse.content}</p>
                      </div>
                    </li>
              ))}
            </ol>
            <div className="flex gap-2 justify-center p-2 md:p-4">
              <h1 className="basis-auto text-xs text-gray-200">본서에 사용한 『성경전서 개역개정판』의 저작권은 재단법인 대한성서공회 소유이며 재단법인 대한성서공회의 허락을 받고 사용하였음</h1>
            </div>
      </div>
    </>
  )
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

// TODO - update metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ book: number, chapter: number }>
}) {
  const { book, chapter } = await params
  const bookName: string = await fetchBookNameFromId(book);
  return {
    title: bookName + chapter + "장",
  }
}