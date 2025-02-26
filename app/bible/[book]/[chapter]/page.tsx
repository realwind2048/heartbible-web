import { getVersesFromFreeBible } from '@/app/domain/usecase/FreeBibleUseCase'

interface Verse {
  id: number;
  book: number;
  chapter: number;
  verse: number;
  content: string;
}

export default async function Page({ params }: { params: Promise<{ book: number, chapter: number }> }) {
  const { book, chapter } = await params;
  const verses: Verse[] = await getVersesFromFreeBible(book, chapter);
  return (
    <>
      <div className="flex flex-col gap-2 justify-center p-5 md:p-10"> 
            <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">한글성경뱃지</span>
            <div className="flex gap-2 justify-center p-2 md:p-4">
              <h1 className="basis-auto">책 {book}</h1>
              <h2 className="basis-auto">챕터 {chapter}</h2>
            </div>
            {verses.map((verse) => (
              <ol className="list-none">
                  <li key={verse.id}>
                    <div className="flex">
                        <p className="basis-8">{verse.verse}</p>
                        <p className="basis-full">{verse.content}</p>
                    </div>
                  </li>
              </ol>
            ))}
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const paths = [
    {
      params: {
        book: '1',
        chapter: '1'
      }
    },
    {
      params: {
        book: '1',
        chapter: '2'
      }
    },
    {
      params: {
        book: '1',
        chapter: '3'
      }
    },
    {
      params: {
        book: '1',
        chapter: '10'
      }
    }
  ]
  return paths.map((path) => ({
      params: {
        book: path.params.book,
        chapter: path.params.chapter
      }
  }))
}