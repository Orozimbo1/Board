// Styles
import styles from './styles.module.scss'

// Next
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

// Next Auth
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export const metadata: Metadata = {
  title: 'Board | Seja um apoiador',
  description: 'Página de apoiadores.'
}

export const Donate = async () => {
  const session = await getServerSession(authOptions)

  if(!session?.id) {
    redirect('/')
  }

  const user = {
    nome: session?.user.name,
    id: session?.id,
    image: session?.user.image
  }

  // console.log(user)

  return (
    <main className={styles.donate_container}>
      <img src="/images/rocket.svg" alt="Seja um apoiador." />
      
      <div className={styles.vip}>
        <img src={user.image} alt={`Foto de perfil do apoiador ${user.name}`} />
        <span>Parabéns {user.nome}, você agora é um apoiador!</span>
      </div>

      <h1>Seja um apoiador deste projeto 🏆</h1>
      <h3>Contribua com apenas <span>R$ 1,00</span></h3>
      <strong>Apareça na nossa Home, tenha funcionalidades exclusivas.</strong>
    </main>
  )
}

export default Donate