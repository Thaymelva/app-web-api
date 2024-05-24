import styles from './Home.module.css';

function Home (){
    return(
        <section className={styles.home_container}>

            <h1>Bem Vindo ao Web App <span>Libri</span></h1>
            <p>Comece a Gerenciar Seus Livros Agora Mesmo!</p>

        </section>
    )
}

export default Home;