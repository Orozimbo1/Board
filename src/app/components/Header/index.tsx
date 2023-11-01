// Styles
import styles from './styles.module.scss'

// Router
import Link from 'next/link'

// Components
import { SignInButton } from '../SignInButton'

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <img src="/images/logo.svg" alt="Logo meu board" />
        </Link>
        <nav>
          <Link href="/">
            Home
          </Link>
          <Link href="/board">
            Meu Board
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}