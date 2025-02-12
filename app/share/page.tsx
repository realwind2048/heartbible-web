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
                pathname: `/share/versecard`,
                query: { 
                  imageSrc: '/images/bg/bg_4.webp',
                  verseString: "예수께서 대답하여 이르시되 진실로 진실로 내게 이르노니 사람이 거듭나지 아니하면 하나님의 나라를 볼 수 없느니라",
                  indexString: "요한복음 3:3",
                },
              }}>Verse 0 - VerseCard
              </Link>
          </li>
          <li>
            <Link 
              href={{
                pathname: `/share/1`,
                query: { 
                  imageSrc: '/images/bg/bg_1.webp',
                  verseString: "예수께서 대답하여 이르시되 진실로 진실로 내게 이르노니 사람이 거듭나지 아니하면 하나님의 나라를 볼 수 없느니라",
                  indexString: "요한복음 3:3",
                },
              }}>Verse 1 - VerseCard with verseId
              </Link>
          </li>
          <li>
            <Link 
              href={{
                pathname: `/share/2`,
                query: { 
                  imageSrc: '/images/bg/bg_2.webp',
                  verseString: "예수께서 대답하여 이르시되 진실로 진실로 내게 이르노니 사람이 거듭나지 아니하면 하나님의 나라를 볼 수 없느니라",
                  indexString: "요한복음 3:3",
                },
              }}>Verse 2 - VerseCard with verseId
              </Link>
          </li>
          <li>
            <Link 
              href={{
                pathname: `/share/3`,
                query: { 
                  imageSrc: '/images/bg/bg_3.webp',
                  verseString: "예수께서 대답하여 이르시되 진실로 진실로 내게 이르노니 사람이 거듭나지 아니하면 하나님의 나라를 볼 수 없느니라",
                  indexString: "요한복음 3:3",
                },
              }}>Verse 3 - VerseCard with verseId
              </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}