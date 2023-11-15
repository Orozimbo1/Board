/* eslint-disable */
// @ts-nocheck
// Components
import { SupportButton } from '@/app/components/SupportButton'
import { FormTask } from '@/app/components/FormTask'
import { VipContainer } from '@/app/components/VipContainer'

// Next
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

// Next Auth
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

// Firebase
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/app/services/firebaseConnection'

// Date fns
import { format } from 'date-fns'

export const metadata: Metadata = {
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
    id: session?.id,
    vip: session?.vip,
    lastDonate: session?.lastDonate
  }

  const tasksRef = collection(db, 'tarefas')

  let q;
  q = query(tasksRef, where('userId', '==', user.id), orderBy('createdAt', 'asc')) 
  
  const querySnapshot = await getDocs(q);

  const tasks = JSON.stringify(querySnapshot.docs.map((doc) => {
    return { 
      id: doc.id,
      createdFormated: format(doc.data().createdAt.toDate(), 'dd MMMM yyyy'),
      ...doc.data() 
    }
  }));
  
  return (
    <>
      <FormTask user={user} tasks={tasks} />
      {user.vip && (
        <VipContainer lastDonate={user.lastDonate} />
      )}
      <SupportButton />
    </>
  )
}

export default Board;