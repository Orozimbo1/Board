// Styles
import './styles/global.scss'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// Components
import { Header } from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Board | Organizando tarefas',
  description: 'Gerenciador de tarefas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
