"use client"
// Styles
import styles from './FormTask.module.scss'

// Hooks
import React, { FormEvent, useState } from 'react'

// Icons
import { FiPlus } from 'react-icons/fi'

// Firebase
import { db, app } from '@/app/services/firebaseConnection';
import { collection, addDoc } from "firebase/firestore";

interface BoardProps{
  user: {
    id: string,
    nome: string
  }
}

export const FormTask = ({ user }: BoardProps) => {
  const [input, setInput] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if(!input) {
      console.log('nao')
      return
    }
    
    const newBoard = await addDoc(
      collection(db, 'tarefas'), 
      {
        createdAt: new Date(),
        tarefa: input,
        userId: user.id,
        nome: user.nome
      }
    )
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder='Digite sua tarefa..' 
        value={input}
        onChange={(e) => setInput(e.target.value)} 
      />
      <button type='submit'>
        <FiPlus size={25} color="#17181F" />
      </button>
    </form>
  )
}