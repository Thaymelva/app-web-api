import styles from './CardBook.module.css';
import { Link } from 'react-router-dom';

function CardBook({id, livro, autor, category, handlerRemove}){

    const remove = (event)=>{
        event.preventDefault();
        handlerRemove(id);
    }

    return(
        <div className={styles.book_card}>

            <h4>{livro}</h4>
            
            <p></p>{autor}

            <p className={styles.category_text}>
                <span></span> {category}
            </p>

            <div className={styles.card_book_actions}>

                <Link to={`/editarLivro/${id}`}>
                    Editar
                </Link>

                <button onClick={remove}>
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default CardBook;