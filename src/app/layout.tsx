"use client"

// Next Auth
import { SessionProvider } from 'next-auth/react'

// Styles
import './styles/global.scss'

import { Inter } from 'next/font/google'

// Components
import { Header } from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode,
  session: any
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
