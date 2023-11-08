/* eslint-disable */
// @ts-nocheck
"use client"
// Styles
import styles from './FormTask.module.scss'

// Hooks
import React, { FormEvent, useState } from 'react'

// Icons
import { FiCalendar, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi'

// Firebase
import { db, app } from '@/app/services/firebaseConnection';
import { collection, addDoc, deleteDoc, doc, getDoc } from "firebase/firestore";

// Date Fns
import { format } from 'date-fns';

// Next
import Link from 'next/link';

type TaskList = {
  id: string;
  createdAt: string | Date;
  createdFormated?: string;
  tarefa: string;
  userId: string;
  nome: string;
}

interface BoardProps{
  user: {
    id: string,
    nome: string
  },
  tasks: string
}

export const FormTask = ({ user, tasks }: BoardProps) => {

  const [input, setInput] = useState('')
  const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(tasks))

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
        nome: user.nome,
      }
    ).then((doc) => {
      console.log('CADASTRADO COM SUCESSO')
      let data = {
        id: doc.id,
        createdAt: new Date(),
        createdFormated: format(new Date(), 'dd MMMM yyyy'),
        tarefa: input,
        userId: user.id,
        nome: user.nome,
      }

      setTaskList([...taskList, data])
      setInput('')
    }).catch((err) => {
      console.log('DEU ERRO', err)
    })
  }

  const handleDelete = async (id: string) => {
    setTaskList([...taskList.filter(el => el.id != id)])

    await deleteDoc(doc(db, 'tarefas', id))
  }

  return (
    <main className={styles.container}>
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
      <h1>Você tem {taskList.length} {taskList.length === 1 ? 'Tarefa' : 'Tarefas'}!</h1>
      <section>
        {taskList.map((task) => (
          <article className={styles.taskList} key={task.id}>
            <Link href={`/board/${task.id}`}>
              <p>{task.tarefa}</p>
            </Link>
            <div className={styles.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color="#FFB800"/>
                  <time>{task.createdFormated}</time>
                </div>
                <button>
                  <FiEdit2 size={20} color="#FFF"/>
                  <span>Editar</span> 
                </button>
              </div>
                <button onClick={() => handleDelete(task.id)}>
                  <FiTrash size={20} color="#FF3636" />
                  <span>Excluir</span>
                </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}