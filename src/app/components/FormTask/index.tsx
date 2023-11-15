/* eslint-disable */
// @ts-nocheck
"use client"
// Styles
import styles from './styles.module.scss'

// Hooks
import React, { FormEvent, useState } from 'react'

// Icons
import { FiCalendar, FiEdit2, FiPlus, FiTrash, FiX } from 'react-icons/fi'

// Firebase
import { db, app } from '@/app/services/firebaseConnection';
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

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
    nome: string,
    vip: Boolean,
    lastDonate: string | Date
  },
  tasks: string
}

export const FormTask = ({ user, tasks }: BoardProps) => {

  const [input, setInput] = useState('')
  const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(tasks))
  const [taskEdit, setTaskEdit] = useState<TaskList | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if(!input) {
      console.log('nao')
      return
    }

    if(taskEdit) {
      const docRef = await doc(db, 'tarefas', taskEdit.id)
    
      await updateDoc(docRef, {
        tarefa: input
      })
      .then(() => {
        let data = taskList;
        let taskIndex = data.findIndex(el => el.id == taskEdit.id)
        taskList[taskIndex].tarefa = input

        setTaskList(data)
        setInput('')
        setTaskEdit(null)
      })
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
    await deleteDoc(doc(db, 'tarefas', id))
    .then(() => {
      setTaskList([...taskList.filter(el => el.id != id)])
    }).catch(err => {
      console.log('DEU ERRO', err)
    })
  }

  const handleUpdate = async (task: TaskList) => {
    setTaskEdit(task)
    setInput(task.tarefa)
  }

  const handleCancel = () => {
    console.log('gh')
    setInput('')
    setTaskEdit(null)
  }

  return (
    <main className={styles.container}>
      {taskEdit && (
        <span className={styles.warnText}>
          <button onClick={handleCancel}>
            <FiX size={30} color='#FF3636'/>
          </button>
          Você está editando '{taskEdit.tarefa}'
        </span>
      )}
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
            <Link href={user.vip ? `/board/${task.id}` : '/board'}>
              <p>{task.tarefa}</p>
            </Link>
            <div className={styles.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color="#FFB800"/>
                  <time>{task.createdFormated}</time>
                </div>
                {user.vip && (
                  <button onClick={() => handleUpdate(task)}>
                    <FiEdit2 size={20} color="#FFF"/>
                    <span>Editar</span> 
                  </button>
                )}
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