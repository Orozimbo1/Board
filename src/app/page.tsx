import styles from './styles/page.module.scss'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1 className={styles.title}>Primeiro segundo projeto com <span>NextJs</span></h1>
      <Link href='/contato'>Contato</Link>
    </main>
  )
}
