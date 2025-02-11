'use client'

// use serchParams to get the imageSrc from the URL
// https://nextjs.org/docs/app/api-reference/functions/use-search-params
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';

export default function Page() {
  const searchParams = useSearchParams()
  const search = searchParams.get('imageSrc')
  return (
    <div className="relative w-full h-full text-center">
      <div className="relative bg-[url('/images/bg_1.webp')] w-full h-full bg-cover bg-center brightness-50">
      </div>
      <div className="absolute top-0 left-0 flex h-screen w-full h-full">
        <div className={`m-auto max-w-sm rounded overflow-hidden shadow-lg`}>
          <div className="px-6 py-4">
            <div className="text-xl mb-2 text-white">
              예수께서 대답하여 이르시되 진실로 진실로 내게 이르노니 사람이 거듭나지 아니하면 하나님의 나라를 볼 수 없느니라
            </div>
            <hr class="w-10 h-px mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700"></hr>
            <p className="text-white text-base">
              요한복음 3:3
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}