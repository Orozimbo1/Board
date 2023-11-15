// Styles
import styles from './styles.module.scss'

// Next
import Link from 'next/link'
import Image from 'next/image'

// Components
import { SignInButton } from '../SignInButton'

// Images
import logo from '../../../../public/images/logo.svg'

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <Image src={logo} alt="Logo meu board"/>
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