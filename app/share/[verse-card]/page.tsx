import Image from 'next/image';

function generateStaticParams() {}
 
export default function Page() {
  return <div>
        <Image src="/images/bg_1.webp" alt="image" width="100" height="100"/>
        <h1>Hello, verse-card Page!</h1>
    </div>
}