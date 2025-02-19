'use client'

// 이 수는 Particles.tsx의 particles 갯수 + 1과 일치해야 함
const maxParticlesIdCount = 5;

export function getRandomParticlesId(): number {
    const randomId = Math.floor(Math.random() * maxParticlesIdCount);
    return randomId;
}