'use client'
// Next Auth
import { SessionProvider } from "next-auth/react"

// PayPal
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

const initialOptions = {
  'clientId': 'Ab3u3piBFYW6xf7WR3s8m-C_KVItj4fybUMKMFmxt6W9wz8bhOdOyxI1dMINKm-L-TuOEAhoI6kgKcS3',
  currency: 'BRL',
  intent: 'capture'
}

export default function Provider ({
  children,
  session
}: {
  children: React.ReactNode
  session: any
}): React.ReactNode {
  return <SessionProvider session={session}>
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  </SessionProvider>
}