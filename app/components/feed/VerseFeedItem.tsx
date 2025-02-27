import Link from 'next/link'
import { getRandomBackgroundImageSrc } from '@/app/lib/BackgroundUseCase';
import { HeartBibleVerse } from '@/app/types/models';

export async function VerseFeedItem({ heartBibleVerse }: { heartBibleVerse: HeartBibleVerse}) {
    const imageSrc2 = getRandomBackgroundImageSrc();
    console.log('VerseFeedItem imageSrc2:', imageSrc2);

    return (
        <>
            <Link 
                href={{
                    pathname: `/share/heartbible/random`,
                }}>
                <div 
                    className="bg-cover rounded overflow-hidden shadow-lg"
                    // 다이나믹 이미지는 이렇게 처리해야한다. className 으로 처리하면 안된다.
                    style={{ backgroundImage: `url(${imageSrc2})` }} 
                >
                    <div className="bg-black/30 backdrop-brightness-50">
                        <div className="basis-full">
                            <div className={`rounded`}>
                                <div className="px-6 py-4">
                                    <div className="text-xl mb-2 text-white">
                                        {heartBibleVerse.verseKo}
                                    </div>
                                    <hr className="w-10 h-px mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700"></hr>
                                    <p className="text-white text-base">
                                        {heartBibleVerse.bookKo} {heartBibleVerse.indexKo}
                                    </p>
                                </div>
                            </div>
                            <div className="basis-full px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#말씀카드</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#공유</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
  }