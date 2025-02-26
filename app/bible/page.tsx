    import { fetchAllBooks } from '@/app/domain/usecase/FreeBibleUseCase'

export default async function Page() {
  const allBooks = fetchAllBooks();
  return (
    <>
      <div className="flex flex-col gap-2 justify-center p-5 md:p-10"> 
            <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">개역개정</span>
            <ol className="list-none">
              {allBooks.map((book) => (
                <li key={book.book}>
                    <div className="flex m-5">
                        <p className="basis-32">{book.name}</p>
                        <div className="basis-full">
                        <div className="flex flex-wrap gap-3">
                            {[...Array(book.chapterCount)].map((x, i) =>
                                <button type="button" key={i} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                                    <div>{`${i + 1}`}</div>
                                </button>
                            )}
                        </div>
                        </div>
                    </div>
                </li>
              ))}
            </ol>
      </div>
    </>
  )
}