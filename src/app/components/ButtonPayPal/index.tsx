/* eslint-disable */
// @ts-nocheck
"use client"
// PayPal
import { PayPalButtons } from "@paypal/react-paypal-js";

// Firebase
import { db } from "@/app/services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";

// Context
import { useDonateContext } from "@/app/context/client-provider";

interface DonateProps {
  imageUrl : string
}

export const ButtonPayPal = ({ imageUrl }: DonateProps) => {
  const { setDonate } = useDonateContext()
  const handleSaveDonate = async () => {
    await addDoc(
      collection(db, 'users'), 
      {
        donate: true,
        lastDonate: new Date(),
        image: imageUrl
      }
    ).then(() => {
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