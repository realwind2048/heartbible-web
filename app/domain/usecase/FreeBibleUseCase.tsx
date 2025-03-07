import sql from "better-sqlite3"

// 데이터베이스 연결
const db = sql("free-bible-kor-nkrv.db");
import { getBookNameFromId, getAllBooks } from './BibleBookUseCase';

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

export const fetchAllBooks = (): { book: number, name: string, chapterCount: number }[] => {
    return getAllBooks();
}

export const fetchBookNameFromId = (book: number): string => {
  return getBookNameFromId(book);
}

export const getPrevChapterLink = (book: number, chapter: number): string => {
  const allBooks = fetchAllBooks();
  if (chapter == 1) {
    const prevBook = allBooks.find((b) => b.book == book - 1);
    if (prevBook == undefined) { // 못찾았을 때 (창세기 1장인 경우) bible 페이지로 이동
      return `/bible`;
    } else { // 이전 책의 마지막 장을 찾았을 때
      return `/bible/nkrv/${prevBook?.book}/${prevBook?.chapterCount}`;
    }
  } else { // 이전 장을 찾았을 때
    return `/bible/nkrv/${book}/${chapter - 1}`;
  }
}

export const getNextChapterLink = (book: number, chapter: number): string => {
  const allBooks = fetchAllBooks();
  const currentBook = allBooks.find((b) => b.book == book);
  if (chapter == currentBook?.chapterCount) {
    const nextBook = allBooks.find((b) => b.book == Number(book) + 1);
    if (nextBook == undefined) { // 못찾았을 때 (요한계시록 22장인 경우) bible 페이지로 이동
      return `/bible`;
    } else { // 다음 책의 1장을 찾았을 때
      return `/bible/nkrv/${nextBook?.book}/1`;
    }
  } else {
    return `/bible/nkrv/${book}/${Number(chapter) + 1}`;
  }
}