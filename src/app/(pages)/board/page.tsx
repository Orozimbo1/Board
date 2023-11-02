// Styles
import styles from './styles.module.scss'

// Icons
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi'

// Components
import { SupportButton } from '@/app/components/SupportButton'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Board | Minhas tarefas',
  description: 'Crie suas tarefas.',
}

export const Board = () => {
  return (
    <>
      <main className={styles.container}>
        <form>
          <input 
            type="text" 
            placeholder='Digite sua tarefa..'  
          />
          <button type='submit'>
            <FiPlus size={25} color="#17181F" />
          </button>
        </form>

        <h1>Você tem 3 tarefas!</h1>

        <section className={styles.taskList}>
          <article>
            <p>Aprender Inglês em 3 meses</p>
            <div className={styles.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color="#FFB800"/>
                  <time>02 de Novembro, 2023</time>
                </div>
                <button>
                  <FiEdit2 size={20} color="#FFF"/>
                  <span>Editar</span> 
                </button>
              </div>
                <button>
                  <FiTrash size={20} color="#FF3636" />
                  <span>Excluir</span>
                </button>
            </div>
          </article>
        </section>
      </main>

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

export default Board