'use client'

import { getHeartBibleVerse } from "./firebase/RealtimeDatabase"

const maxHeartBibleVerseCount = 918;

export function getRandomHeartBibleVerseId() {
    const randomHeartBibleVerseId = Math.floor(Math.random() * maxHeartBibleVerseCount);
    console.log('randomHeartBibleVerseId:', randomHeartBibleVerseId);
    return randomHeartBibleVerseId;
}

export async function getRandomHeartBibleVerse() {
    const randomHeartBibleVerseId = getRandomHeartBibleVerseId();
    return getHeartBibleVerse(randomHeartBibleVerseId);
}

// TODO network 요청, db 접근이 너무 많지 않게 개선 필요
export async function getRandomHeartBibleVerses(count: number) {
    const randomHeartBibleVerses = [];
    for (let i = 0; i < count; i++) {
        randomHeartBibleVerses.push(await getRandomHeartBibleVerse());
    }
    return randomHeartBibleVerses;
}
