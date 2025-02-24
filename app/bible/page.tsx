import sql from "better-sqlite3"

// 데이터베이스 연결
const db = sql("./free-bible-kor-nkrv.db", { verbose: console.log });

interface Verse {
  id: number;
  book: string;
  verse: string;
}

const getVerses = async (): Promise<Verse[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 지연
  // TODO FIX [ Server ] Error: no such table: bible
  return db.prepare("SELECT id, book, verse FROM bible LIMIT 1").all() as Verse[]; // 데이터 가져오기
};

export default async function Page() {
    const verses = await getVerses();
  return (
    <>
      <div className="flex flex-col gap-4 justify-center gap-4 px-5 md:px-10"> 
            {verses.map((verse) => (
                <div key={verse.id}>
                    <h1>{verse.book}</h1>
                    <p>{verse.verse}</p>
                </div>
            ))}
      </div>
    </>
  )
}