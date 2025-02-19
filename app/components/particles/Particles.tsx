'use client';
import dynamic from 'next/dynamic'

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
    case 0:
      return <Snow />;
    case 1:
      return <SlideStar />;
    case 2:
      return <Stars />;
    case 3:
      return <Growing />;
    default:
      return null;
  }
}