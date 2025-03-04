// import { getHeartBibleVerse } from "../../lib/firebase/RealtimeDatabase"
// 속도 개선을 위해 local data를 사용하도록 변경함
import { getHeartBibleVerseById, getHeartBibleVerseSize } from "../../data/HeartBibleVerses"
import { BASE_URL } from "@/app/lib/constants";

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

/**
 * ex) https://heartbible.app/share/heartbible/254?bg=172&pt=1
 */
export function getShareUrl(heartBibleVerseId: number, bgId: string, particlesId: string) {
    var base_share_url: string = `${BASE_URL}share/heartbible/${heartBibleVerseId}`;
    if (bgId) {
        base_share_url += `?bg=${bgId}`;
    }
    if (particlesId) {
        base_share_url += `&pt=${particlesId}`;
    }
    return base_share_url;
}
