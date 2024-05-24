import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Message from '../components/message/Message';
import Container from '../components/Container';
import Cardbook from '../components/CardBook/CardBook';

import styles from './Livros.module.css';

function Livros (){

    const [books, setBooks] = useState([]);

    // Estado de dados da Mensagem de Exclusão de Livros
    const [bookMessage, setBookMessage] = useState('');

    useEffect(()=>{
        
        fetch('http://localhost:5000/books', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            },
        })
            .then((resp)=>resp.json())
            .then((data)=>{setBooks(data)})
            .catch((err)=>{console.log(err)});

    }, [books]);

    // Função de Exclusão de Livro
    function removeBooks(id){

        fetch(`http://localhost:5000/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            },
        })
        .then(resp=> resp.json())
        .then(
            (data) => {
                // setBooks(books.filter((book_data)=> book_data.id != id))
                // alert('Livro Exclusivo!')

                setBookMessage('Livro Excluido Com Sucesso');
            }
        )
        .catch(err=>console.log(err));

    }


    const location = useLocation();
    let message = '';

    // console.log('location state: ' + location.state);

    if (location.state){
        message = location.state;
    }

    return(
        <section className={styles.livros_container}>

            <h1>Aqui Serão Listados os Seus <span>Livros!</span></h1>
            
            {/* Mensagem de Sucesso Para Cadastro */}
            {
                message && (
                    <Message
                        msg={message}
                        type='success'
                    />                    
                )
            }

            {/* Mensagem de Sucesso para Exclusivo */}
            {
                bookMessage && (
                    <Message
                        msg={bookMessage}
                        type='success'
                    />                    
                )
            }

            {/* <Container> */}

            {

                books.map((book)=>[
                    <Cardbook
                        id={book.id}
                        livro={book.nome_livro}
                        autor={book.nome_autor}
                        category={book.category.category}
                        key={book.id}
                        handlerRemove={removeBooks}
                    />
                ])
            }
            {/* </Container> */}

        </section>
    )
}

export default Livros;