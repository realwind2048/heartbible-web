import sql from "better-sqlite3"

// 데이터베이스 연결
const db = sql("free-bible-kor-nkrv.db");
import { getBookNameFromId } from './BibleBookUseCase';

interface Verse {
  id: number;
  book: number;
  chapter: number;
  verse: number;
  content: string;
}

export const getVersesFromFreeBible = async (book: number, chapter: number): Promise<Verse[]> => {
    return db.prepare(`SELECT id, book, chapter, verse, content FROM bible WHERE book=${book} AND chapter=${chapter}`).all() as Verse[]; // 데이터 가져오기
}

export const getBookChapterMap = async (): Promise<{ book: number, chapter: number }[]> => {
    return db.prepare(`SELECT DISTINCT book, chapter FROM bible`).all() as { book: number, chapter: number }[]; // 데이터 가져오기
}

export const fetchBookNameFromId = async (book: number): Promise<string> => {
  return getBookNameFromId(book);
}