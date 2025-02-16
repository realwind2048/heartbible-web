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
