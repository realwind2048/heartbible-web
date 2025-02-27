import { VerseFeedItem } from './VerseFeedItem'
import { getRandomHeartBibleVerses } from '@/app/domain/usecase/HeartBibleVerseUseCase'

export async function VerseFeed() {
    console.log('VerseFeed');
    const verses = await getRandomHeartBibleVerses(10) as { verseKo: string, bookKo: string, indexKo: string }[];
    return (
        <>
            {verses.map((verse, index) => (
                <VerseFeedItem verseString={verse.verseKo} indexString={`${verse.bookKo} ${verse.indexKo}`} key={index}/>
            ))}
        </>
    );
  }