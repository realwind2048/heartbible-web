'use client';

import { HeartBibleVerse } from '@/app/types/models';
import { VerseFeedItem } from './VerseFeedItem'
import { getRandomHeartBibleVerses } from '@/app/domain/usecase/HeartBibleVerseUseCase'
import { useState, useEffect } from 'react';

export function VerseFeed() {
    const [heartBibleVerses, setHeartBibleVerses] = useState<HeartBibleVerse[]>([]);

    useEffect(() => {
        const loadVerses = async () => {
            const verses = await getRandomHeartBibleVerses(10) as HeartBibleVerse[];
            setHeartBibleVerses(verses);
        };
        loadVerses();
    }, []);

    return (
        <>
            {heartBibleVerses.map((heartBibleVerse, index) => (
                <VerseFeedItem heartBibleVerse={heartBibleVerse} key={index}/>
            ))}
        </>
    );
}