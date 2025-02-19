'use client';
import dynamic from 'next/dynamic'

// 파티클 갯수가 변경되면 ParticlesUseCase.tsx의 maxParticlesIdCount도 변경해야 함
const Snow = dynamic(() => 
  import('@/components/particles/Snow').then((mod) => mod.Snow))
const SlideStar = dynamic(() => 
  import('@/components/particles/SlideStar').then((mod) => mod.SlideStar))
const Stars = dynamic(() => 
  import('@/components/particles/Stars').then((mod) => mod.Stars))
const Growing = dynamic(() => 
  import('@/components/particles/Growing').then((mod) => mod.Growing))

interface ParticlesProps {
  id: string;
}

export function Particles({ id }: ParticlesProps) {
  switch (Number(id)) {
    case 1: // 빈값도 0으로 처리되어 1부터 시작함
      return <Snow />;
    case 2:
      return <SlideStar />;
    case 3:
      return <Stars />;
    case 4:
      return <Growing />;
    default:
      return null;
  }
}