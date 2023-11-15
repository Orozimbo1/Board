/* eslint-disable */
// @ts-nocheck
"use client"
// Icons
import { FiClock } from 'react-icons/fi'

// Styles
import styles from './styles.module.scss'

// Date Fns
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const VipContainer = ({ lastDonate }) => {
  return (
    <div className={styles.vipContainer}>
      <h3>Obrigado por apoiar esse projeto.</h3>
      <div>
        <FiClock size={28} color="#FFF"/>
        <time>
          Última doação foi a {formatDistance(new Date(lastDonate), new Date(), { locale: ptBR })}.
        </time>
      </div>
    </div>
  )
}