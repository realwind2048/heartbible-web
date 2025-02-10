import Link from 'next/link'

export default async function Page() {
  return (
    <div>
      <ul>
        <li><Link href={`/share/1`}>Verse 1</Link></li>
        <li><Link href={`/share/2`}>Verse 2</Link></li>
        <li><Link href={`/share/3`}>Verse 3</Link></li>
      </ul>
    </div>
  )
}