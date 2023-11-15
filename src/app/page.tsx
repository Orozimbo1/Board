/* eslint-disable */
// @ts-nocheck

// Styles
import styles from './styles/page.module.scss'

// Next
import Image from 'next/image';

// Firebase
import { db } from './services/firebaseConnection';
import { collection, getDocs } from 'firebase/firestore';

// Images
import boardUser from '../../public/images/board-user.svg'

export default async function Home() {
  const querySnapshot = await getDocs(collection(db, "users"));
  const donaters = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    }
  });
  return (
    <main className={styles.contentContainer}>
      <Image src={boardUser} alt="Ferramenta Board" className={styles.banner} />
      <section className={styles.callToAction}>
        <h1>Uma ferramenta para o seu dia a dia. Escreva, planeje e organize...</h1>
        <p>
          <span>100% Gratuita </span>
          e online.
        </p>
      </section>

      <div className={styles.donaters}>
        {donaters.length !== 0 && <h3>Apoiadores:</h3>}
        {donaters && donaters.map((donater) => (
          <img src={donater.image} alt="Doador" key={donater.id}/>
        ))}
      </div>
    </main>
  )
}
