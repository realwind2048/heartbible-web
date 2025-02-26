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
      <div className="flex flex-col gap-4 justify-center gap-4 px-5 md:px-10"> 
            {verses.map((verse) => (
              <li key={verse.id}>
                <div className="flex">
                    <h1 className="size-10 flex-non">{verse.book}</h1>
                    <h2 className="size-10 flex-non">{verse.chapter}</h2>
                    <p className="size-10 flex-non">{verse.verse}</p>
                    <p className="size-10 flex-grow">{verse.content}</p>
                </div>
              </li>
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