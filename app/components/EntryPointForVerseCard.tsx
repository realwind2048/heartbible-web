import Link from 'next/link'
import Image from 'next/image'

/**
 * 정보를 받아서 VerseCard 컴포넌트를 렌더링하는 페이지
 */
export default function EntryPointForVerseCard() {
  return (
    <>
      {/* TODO fix Link */}
      <Link 
            href={{
              pathname: `/share/heartbible/random`,
            }}>
        <div className="rounded overflow-hidden shadow-lg">
        <Image 
          className="object-cover" 
          src="/images/image_bible.webp" 
          style={{ aspectRatio: '3/2' }} 
          alt="VerseCard Background Image"
          width={600}
          height={400}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">말씀 카드</div>
            <p className="text-gray-700 text-base">
              마음말씀이 고른 좋은 말씀이 담긴 카드를 묵상하고 공유할 수 있습니다.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#랜덤</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#말씀카드</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#공유</span>
          </div>
        </div>
      </Link>
    </>
  )
}