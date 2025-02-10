import styles from './styles.module.css'
import Link from 'next/link'

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.share}>{children}
      <div>
        <ul>
          <li><Link href={`/share/1`}>Verse 1</Link></li>
          <li><Link href={`/share/2`}>Verse 2</Link></li>
          <li><Link href={`/share/3`}>Verse 3</Link></li>
        </ul>
      </div>
    </main>
  )
}