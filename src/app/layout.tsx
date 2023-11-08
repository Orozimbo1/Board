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
import Provider from './context/client-provider'

const inter = Inter({ subsets: ['latin'] })

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
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  )
}
