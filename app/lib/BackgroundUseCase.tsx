const backgroundImageList: string[] = [];
const maxBackgroundImageCount = 232;

export function getRandomBackgroundImageSrc() {
    for (let i = 1; i <= maxBackgroundImageCount; i++) {
        backgroundImageList.push(`/images/bg/bg_${i}.webp`);
    }
    // get Random imageSrc from /image/bg folder files
    const ramdomIndex = getRandomBackgroundId();
    const randomimageSrc = backgroundImageList[ramdomIndex];
    console.log('randomimageSrc:', randomimageSrc);
    return randomimageSrc;
}

export function getRandomBackgroundId(): number {
    const ramdomIndex = Math.floor(Math.random() * maxBackgroundImageCount);
    return ramdomIndex;
}

/**
 * 이미지가 있는 경우 이미지 경로를 반환하고, 없는 경우 랜덤 이미지 경로를 반환한다.
 * @param bg
 * @returns 
 */
export function getRandomBackgroundImageSrcFromBgId(bg: string | null) {
    if (bg != null) {
        const bgNumber = Number(bg);
        if (bgNumber <= maxBackgroundImageCount && bgNumber > 0) {
            return `/images/bg/bg_${bg}.webp`;
        }
    } 
    return getRandomBackgroundImageSrc();
}