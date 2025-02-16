let backgroundImageList: any[] = [];
const maxBackgroundImageCount = 232;

export function getRandomBackgroundImageSrc() {
    for (let i = 1; i <= maxBackgroundImageCount; i++) {
        backgroundImageList.push(`/images/bg/bg_${i}.webp`);
    }
    // get Random imageSrc from /image/bg folder files
    const ramdomIndex = Math.floor(Math.random() * maxBackgroundImageCount);
    const randomimageSrc = backgroundImageList[ramdomIndex];
    console.log('randomimageSrc:', randomimageSrc);
    return randomimageSrc;
}