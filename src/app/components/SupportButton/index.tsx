// Styles
import styles from './styles.module.scss'

// Router
import Link from 'next/link'

export const SupportButton = () => {
  return (
    <div className={styles.donateContainer}>
      <Link href="/donate">
        <button>Apoiar</button>
      </Link>
    </div>
  )
}