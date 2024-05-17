import styles from './Home.module.css'

export default function Home() {
  return (
    <section className={styles.home_container}>
      <h1>
        Bem-vindo ao WEB APP<span>Libri</span>
      </h1>
      <p>Comece a gerenciar seus livros</p>
    </section>
  )
}