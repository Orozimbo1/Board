/* eslint-disable */
// @ts-nocheck
"use client"
// PayPal
import { PayPalButtons } from "@paypal/react-paypal-js";

// Firebase
import { db } from "@/app/services/firebaseConnection";
import { doc, setDoc } from "firebase/firestore";

// Context
import { useDonateContext } from "@/app/context/client-provider";

interface DonateProps {
  id: string
  imageUrl : string
}

export const ButtonPayPal = ({ id, imageUrl }: DonateProps) => {
  const { setDonate } = useDonateContext()
  const handleSaveDonate = async () => {
    
    await setDoc(doc(db, "users", id), {
      donate: true,
      lastDonate: new Date(),
      image: imageUrl
    }).then(() => {
      setDonate(true)
    })
  }

  return (
    <PayPalButtons 
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '1'
            }
          }]
        })
      }}
      onApprove={(data, actions) => {
        handleSaveDonate()
      }}
    />
  )
}
    // onCancel={() => {}}
    // onApprove={() => {}}