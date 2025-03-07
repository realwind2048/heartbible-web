// 이 수는 Particles.tsx의 particles 갯수 + 1과 일치해야 함
const maxParticlesIdCount = 5;

export function getRandomParticlesId(): number {
    const randomId = Math.floor(Math.random() * maxParticlesIdCount);
    return randomId;
}

export function getParticlesId(pt: string | null): number {
    if (pt != null) {
        const ptNumber = Number(pt);
        if (ptNumber <= maxParticlesIdCount && ptNumber > 0) {
            return ptNumber;
        }
    } 
    return getRandomParticlesId();
}