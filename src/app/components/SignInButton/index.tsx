// Styles
import styles from './styles.module.scss'

// Icons
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

const handleSignIn = () => {
  console.log('oi')
}

export const SignInButton = () => {
  const session = true

  return session ? (
    <button
      type='button'
      className={styles.signInButton}
      // onClick={handleSignIn}
    >
      <img src="images/Perfil.jpg" alt="Foto de perfil do usuário" />
      Olá Matheus
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type='button'
      className={styles.signInButton}
      // onClick={handleSignIn}
    >
      <FaGithub color="#FFb800" />
      Entrar com GitHub
    </button>
  )
}