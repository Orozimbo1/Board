"use client";

// Next Auth
import { signIn, signOut, useSession } from 'next-auth/react'

// Styles
import styles from './styles.module.scss'

// Icons
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export const SignInButton = () => {
  const { data: session } = useSession()

  return session ? (
    <button
      type='button'
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <img src="images/Perfil.jpg" alt="Foto de perfil do usuário" />
      Olá Matheus
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type='button'
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#FFb800" />
      Entrar com GitHub
    </button>
  )
}