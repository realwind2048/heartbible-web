'use client'


// import { getHeartBibleVerse } from "../../lib/firebase/RealtimeDatabase"
// 속도 개선을 위해 local data를 사용하도록 변경함
import { getHeartBibleVerseById, getHeartBibleVerseSize } from "../../data/HeartBibleVerses"

const maxHeartBibleVerseCount = getHeartBibleVerseSize();

export function getRandomHeartBibleVerseId() {
    const randomHeartBibleVerseId = Math.floor(Math.random() * maxHeartBibleVerseCount);
    console.log('randomHeartBibleVerseId:', randomHeartBibleVerseId);
    return randomHeartBibleVerseId;
}

export async function getRandomHeartBibleVerse() {
    const randomHeartBibleVerseId = getRandomHeartBibleVerseId();
    return getHeartBibleVerseById(randomHeartBibleVerseId);
}

export async function getRandomHeartBibleVerses(count: number) {
    const randomHeartBibleVerses = [];
    for (let i = 0; i < count; i++) {
        randomHeartBibleVerses.push(await getRandomHeartBibleVerse());
    }
    return randomHeartBibleVerses;
}
