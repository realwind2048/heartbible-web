import styles from './styles.module.css'
import Link from 'next/link'

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.share}>{children}
      <div>
        <ul>
          <li>
            <Link 
              href={{
                pathname: `/share/1`,
                query: { imageSrc: '/images/bg_1.webp' },
              }}>Verse 1
              </Link>
          </li>
          <li>
            <Link 
              href={{
                pathname: `/share/2`,
                query: { imageSrc: '/images/bg_2.webp' },
              }}>Verse 2
              </Link>
          </li>
          <li>
            <Link 
              href={{
                pathname: `/share/3`,
                query: { imageSrc: '/images/bg_3.webp' },
              }}>Verse 3
              </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}