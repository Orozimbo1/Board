/* eslint-disable */
// @ts-nocheck

// Styles
import styles from './styles.module.scss'

// Icons
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi'

// Components
import { SupportButton } from '@/app/components/SupportButton'
import { FormTask } from '@/app/components/FormTask'

// Next
// import { Metadata } from 'next'
import { redirect } from 'next/navigation'

// Next Auth
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

// Firebase
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/app/services/firebaseConnection'

export const metadata = {
  title: 'Board | Minhas tarefas',
  description: 'Crie suas tarefas.',
}

const Board = async () => {
  const session = await getServerSession(authOptions)

  if(!session?.id) {
    redirect('/')
  }

  const user = {
    nome: session?.user.name,
    id: session?.id
  }

  const tasksRef = collection(db, 'tarefas')

  let tasks: any[] = [];
  let q;

  q = query(tasksRef, where('userId', '==', user.id), orderBy('createdAt', 'desc')) 
  
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    tasks.push({ id: doc.id, ...doc.data() })
  });
  
  return (
    <>
      <FormTask user={user} tasks={tasks} />
      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar esse projeto.</h3>
        <div>
          <FiClock size={28} color="#FFF"/>
          <time>
            Última doação foi a 3 dias.
          </time>
        </div>
      </div>

      <SupportButton />
    </>
  )
}

export default Board;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const session = getSession()

//    return {
//     props: {

//     }
//    }
// }

// type Repo = {
//   name: string
//   stargazers_count: number
// }
 
// export const getServerSideProps = (async (context) => {
//   const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   const repo = await res.json()
//   return { props: { repo } }
// }) satisfies GetServerSideProps<{
//   repo: Repo
// }>
 
// export default function Page({
//   repo,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return repo.stargazers_count
// }