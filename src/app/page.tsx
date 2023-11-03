// Styles
import styles from './styles/page.module.scss'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Board | Organizando tarefas',
  description: 'Gerenciador de tarefas',
}

export default function Home() {
  return (
    <main className={styles.contentContainer}>
      <img src="images/board-user.svg" alt="Ferramenta Board" className={styles.banner} />
      <section className={styles.callToAction}>
        <h1>Uma ferramenta para o seu dia a dia. Escreva, planeje e organize...</h1>
        <p>
          <span>100% Gratuita </span>
          e online.
        </p>
      </section>

      <div className={styles.donaters}>
        <h3>Apoiadores:</h3>
        <img src="images/Perfil.jpg" alt="Usuário 1" />
        <img src="images/Perfil.jpg" alt="Usuário 2" />
        <img src="images/Perfil.jpg" alt="Usuário 3" />
        <img src="images/Perfil.jpg" alt="Usuário 4" />
        <img src="images/Perfil.jpg" alt="Usuário 5" />
        <img src="images/Perfil.jpg" alt="Usuário 6" />
        <img src="images/Perfil.jpg" alt="Usuário 7" />
      </div>
    </main>
  )
}
