'use client'
 
// use serchParams to get the imageSrc from the URL
// https://nextjs.org/docs/app/api-reference/functions/use-search-params
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';

export default function Page() {
  const searchParams = useSearchParams()
  const search = searchParams.get('imageSrc')
  return (
    <div>
        <Image 
            src={search}
            alt="image" 
            width={100}
            height={100}
            style={{objectFit: "cover"}}
        />
        <div>
            <h1 color="black">Hello, verse-card Page!</h1>
        </div>
    </div>
  )
}