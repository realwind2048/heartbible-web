'use client'
 
// use serchParams to get the imageSrc from the URL
// https://nextjs.org/docs/app/api-reference/functions/use-search-params
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';

export default function Page() {
  const searchParams = useSearchParams()
  const search = searchParams.get('imageSrc')
  return (
    <div className="bg-[url('/images/bg_1.webp')] w-full h-full bg-cover bg-center"></div>
  )
}