import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/libs/constants'
import { fetchAllBooks } from '@/app/domain/usecase/FreeBibleUseCase'

/**
 * Sitemap for Bible pages
 * 성경 정보를 파싱하여 sitemap을 생성합니다.
 * TODO 다른 성경이 추가되면 수정이 필요합니다.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const biblePages: { bible: string; book: number; chapter: number }[] = [];
    const allBooks = fetchAllBooks();
    allBooks.forEach((book) => {
        [...Array(book.chapterCount)].forEach((x, i) => {
            biblePages.push({
                bible: 'nkrv',
                book: book.book,
                chapter: i + 1,
            })
        })
    })
    return biblePages.map((biblePage) => ({
        url: `${BASE_URL}${biblePage.bible}/${biblePage.book}/${biblePage.chapter}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
    }))
}