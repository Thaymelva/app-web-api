import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Message from '../../components/Message/Message';
// import Container from '../../components/Container/Container';
import CardBook from '../../components/CardBook/CardBook';

import styles from './Livro.module.css'

function Livros() {

  const [books, setBooks] = useState([]);

  useEffect(()=>{
      fetch('http://localhost:5000/books', {
        method: 'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then((resp)=>resp.json())
      .then((data)=>setBooks(data))
      .catch((err)=>{console.log(err)});

  })

  //FUNÇÃO DE EXCLUSÃO DE LIVRO
  function removeBooks(id) {
    fetch(`http://localhost:5000/books/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      },
    })
    .then(resp=> resp.json())
    .then(
      (data)=>{
        alert('LIVRO EXCLUÍDO')
      }
    )
    .catch(err=>console(err));
  }

  const location = useLocation();
  let message = '';

  console.log('location state: ' + location.state);

  if (location.state){
    message = location.state;
  }
  return (
    <section className={styles.livros_container}>
      <h1>Aqui serão listados seus<span>livros</span></h1>

      {
        message && (
            <Message
                msg={message}
                type='sucess'
            />
        )
      }

      {/* <Container> */}
        {/* <CardBook
          id='1'
          livro='TESTE DE LIVRO-1'
          autor='TESTE DE AUTOR-1'
          categoria='TESTE DE CATEGORIA-1'>
        </CardBook>

        <CardBook
          id='2'
          livro='TESTE DE LIVRO-2'
          autor='TESTE DE AUTOR-2'
          categoria='TESTE DE CATEGORIA-2'>
        </CardBook>

        <CardBook
          id='2'
          livro='TESTE DE LIVRO-3'
          autor='TESTE DE AUTOR-3'
          categoria='TESTE DE CATEGORIA-3'>
        </CardBook> */}
      {/* </Container> */}
      
      {
        books.map((book)=>(
          <CardBook
              id={book.id}
              livro={book.nome_livro}
              autor={book.nome_autor}
              categoria={book.category.category}
              key={book.id}
              handlerRemove={removeBooks}>
          </CardBook>
        ))
      }

    </section>
  )
}

export default Livros;