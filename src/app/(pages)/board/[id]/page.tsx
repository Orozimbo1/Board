/* eslint-disable */
// @ts-nocheck
// Styles
import styles from './styles.module.scss'

// Next Auth
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"

// Next
import { redirect } from "next/navigation"
import { Metadata, ResolvingMetadata } from "next"

// Firebase
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/app/services/firebaseConnection"

// Date-Fns
import { format } from "date-fns"

// Icons
import { FiCalendar } from 'react-icons/fi'

type Props = {
  params: { id: string }
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id

  const docRef = await doc(db, 'tarefas', id)
  const docSnap = await getDoc(docRef)

  const task = docSnap.data()
 
  return {
    title: `Board | ${task?.tarefa}`,
    description: `Detalhes da tarefa ${task?.tarefa}`
  }
}

export default async function Task({ params }: Props) {
  const session = await getServerSession(authOptions)

  if(!session?.id) {
    redirect('/')
  }

  const docRef = await doc(db, 'tarefas', params.id)
  const task = await getDoc(docRef)
  .then((snapshot) => {
    let data = {
      id: params.id,
      createdAt: snapshot.data().createdAt,
      createdFormated: format(snapshot.data().createdAt.toDate(), 'dd MMMM yyyy'),
      tarefa: snapshot.data().tarefa,
      userId: snapshot.data().userId,
      nome: snapshot.data().nome,
    }

    return data
  }).catch((err) => console.log('DEU ERRO', err))

  return (
    <article className={styles.task_container}>
      <div className={styles.task_actions}>
        <div>
          <FiCalendar size={30} color='#F2F6FC'/>
          <span>Tarefa criada em: </span>
          <time>{task.createdFormated}</time>
        </div>
      </div>
      <p>{task.tarefa}</p>
    </article>
  )
}