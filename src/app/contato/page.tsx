import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Board | Contato',
  description: 'Página de contatos',
}

const contato = () => {
  return (
    <div>
      <h1>Contato</h1>
      <Link href='/'>Home</Link>
    </div>
  )
}

export default contato