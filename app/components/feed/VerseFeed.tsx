import { HeartBibleVerse } from '@/app/types/models';
import { VerseFeedItem } from './VerseFeedItem'
import { getRandomHeartBibleVerses } from '@/app/domain/usecase/HeartBibleVerseUseCase'

export async function VerseFeed() {
    console.log('VerseFeed');
    const heartBibleVerses = await getRandomHeartBibleVerses(10) as HeartBibleVerse[];
    return (
        <>
            {heartBibleVerses.map((heartBibleVerse, index) => (
                <VerseFeedItem heartBibleVerse={heartBibleVerse} key={index}/>
            ))}
        </>
    );
  }