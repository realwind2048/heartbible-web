import { fetchAllBooks } from '@/app/domain/usecase/FreeBibleUseCase'
import Link from 'next/link';

export default async function Page() {
  const allBooks = fetchAllBooks();
  const oldTestament = allBooks.slice(0, 39); // 창세기부터 말라기까지
  const newTestament = allBooks.slice(39);    // 마태복음부터 요한계시록까지

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* 성경 버전 표시 */}
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 w-fit">
          개역개정
        </span>

        {/* 구약성경 섹션 */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">구약성경</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {oldTestament.map((book) => (
              <div key={book.book} className="border rounded-lg p-4 dark:border-gray-700">
                <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">{book.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {[...Array(book.chapterCount)].map((_, i) => (
                    <Link href={`/bible/nkrv/${book.book}/${i + 1}`} key={i}>
                      <button 
                        className="w-8 h-8 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white rounded-full text-sm flex items-center justify-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
                      >
                        {i + 1}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 신약성경 섹션 */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">신약성경</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newTestament.map((book) => (
              <div key={book.book} className="border rounded-lg p-4 dark:border-gray-700">
                <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">{book.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {[...Array(book.chapterCount)].map((_, i) => (
                    <Link href={`/bible/nkrv/${book.book}/${i + 1}`} key={i}>
                      <button 
                        className="w-8 h-8 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white rounded-full text-sm flex items-center justify-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
                      >
                        {i + 1}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}