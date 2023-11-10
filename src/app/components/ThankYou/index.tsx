/* eslint-disable */
// @ts-nocheck
"use client"
// Styles
import styles from './styles.module.scss'

// Context
import { useDonateContext } from '@/app/context/client-provider'

interface ThankYouProps{
  user: {
    name: string,
    image: string,
    id: string
  }
}

export const ThankYou = ({ user }: ThankYouProps) => {
  const { donate } = useDonateContext()

  return (
    <>
      {donate && (
        <div className={styles.vip}>
          <img src={user.image} alt={`Foto de perfil do apoiador ${user.name}`} />
          <span>Parabéns {user.name}, você agora é um apoiador!</span>
        </div>
      )}
    </>
  )
}