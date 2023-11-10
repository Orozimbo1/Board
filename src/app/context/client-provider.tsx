'use client'
// Next Auth
import { SessionProvider } from "next-auth/react"

// Context
import { createContext, useContext, useState } from "react"

// PayPal
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

const initialOptions = {
  'clientId': 'AUKfKiuUkJ9XrmlG4GlBv_LM0GC6QLdjNQsJLyfYLZDbgIGTWFnHgOu4qUgpNbl-1oukOn0FqKeLfqnf',
  currency: 'BRL',
  intent: 'capture'
}

const DonateContext = createContext({})

export const DonateContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
    const [donate, setDonate] = useState(false);

    return (
        <DonateContext.Provider value={{ donate, setDonate }}>
            {children}
        </DonateContext.Provider>
    )
};

export const useDonateContext = () => useContext(DonateContext);

export function Provider ({
  children,
  session
}: {
  children: React.ReactNode
  session: any
}): React.ReactNode {
  return <SessionProvider session={session}>
    <PayPalScriptProvider options={initialOptions}>
      { children }
    </PayPalScriptProvider>
  </SessionProvider>
}