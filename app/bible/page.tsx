import sql from "better-sqlite3"

// 데이터베이스 연결
const db = sql("free-bible-kor-nkrv.db");

interface Verse {
  id: number;
  book: number;
  chapter: number;
  verse: number;
  content: string;
}

const getVerses = async (): Promise<Verse[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 지연
  // TODO FIX [ Server ] Error: no such table: bible
  return db.prepare("SELECT id, book, chapter, verse, content FROM bible LIMIT 10").all() as Verse[]; // 데이터 가져오기
};

export default async function Page() {
    const verses = await getVerses();
  return (
    <>
      <div className="flex flex-col gap-4 justify-center gap-4 px-5 md:px-10"> 
            {verses.map((verse) => (
                <div className="flex" key={verse.id}>
                    <h1 className="size-10 flex-non">{verse.book}</h1>
                    <h2 className="size-10 flex-non">{verse.chapter}</h2>
                    <p className="size-10 flex-non">{verse.verse}</p>
                    <p className="size-10 flex-grow">{verse.content}</p>
                </div>
            ))}
      </div>
    </>
  )
}