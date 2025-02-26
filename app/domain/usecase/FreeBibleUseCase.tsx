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

export const getVersesFromFreeBible = async (book: number, chapter: number): Promise<Verse[]> => {
    return db.prepare(`SELECT id, book, chapter, verse, content FROM bible WHERE book=${book} AND chapter=${chapter}`).all() as Verse[]; // 데이터 가져오기
};