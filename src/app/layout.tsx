// React
import React from 'react'

// Next Auth
import { getServerSession } from 'next-auth'
import { authOptions } from './(pages)/api/auth/[...nextauth]/route'

// Styles
import './styles/global.scss'

import { Inter } from 'next/font/google'

// Components
import { Header } from './components/Header'

// Context
import { Provider, DonateContextProvider } from './context/client-provider'

// Next
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Board | Organizando tarefas',
  description: 'Gerenciador de tarefas',
  icons: {
    icon: ['/images/favicon.ico']
  }
}

export default async function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Provider session={session}>
          <DonateContextProvider>
            <Header />
            {children}
          </DonateContextProvider>
        </Provider>
      </body>
    </html>
  )
}
