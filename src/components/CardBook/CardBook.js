import styles from './CardBook.module.css';
import { link } from 'react-router-dom';

function CardBook({id, livro, autor, categoria, handlerRemove}) {

    const remove = (event)=>{
        event.preventDefault();
        handlerRemove(id);
    }

    return(
        <div className={styles.book_card}>
            <h4>{livro}</h4>
            <p>{autor}</p>
            <p className={styles.category_text}>
                <span></span>{categoria}
            </p>


            <div className={styles.book_card_actions}>
                <link to={`/editarLivro/${id}`}>
                    Editar
                </link>

                <button onClick={remove}>
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default CardBook;