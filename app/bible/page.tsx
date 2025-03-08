import { fetchAllBooks } from '@/app/domain/usecase/FreeBibleUseCase'
import Tabs from './components/Tabs';
import QuickNav from './components/QuickNav';
import { Book } from '@/app/types/models';

export default async function Page() {
  const allBooks = fetchAllBooks().map(book => ({
    ...book,
    book: book.book.toString()
  })) as Book[];
  const oldTestament: Book[] = allBooks.slice(0, 39); // 창세기부터 말라기까지
  const newTestament: Book[] = allBooks.slice(39);    // 마태복음부터 요한계시록까지

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* 성경 버전 표시 */}
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 w-fit">
          개역개정
        </span>

        <QuickNav oldTestament={oldTestament} newTestament={newTestament} />
        
        <Tabs oldTestament={oldTestament} newTestament={newTestament} />
      </div>
    </div>
  )
}