import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Message from '../../components/Message/Message';
import CardBook from '../../components/CardBook/CardBook';

import styles from './Livro.module.css';

function Livros() {
  const [books, setBooks] = useState([]);
  const location = useLocation();
  const message = location.state || '';

  useEffect(() => {
    // Chamada para buscar todos os livros
    fetch('http://localhost:5000/books', {  // Ajustado para buscar todos os livros, removido o '/${id}'
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => {
      setBooks(data);
    })
    .catch(err => {
      console.log('Erro ao buscar livros:', err);
    });
  }, []);  // Adicionado um array de dependências vazio para executar apenas uma vez após o montar o componente

  // Função de exclusão de livro
  function removeBooks(id) {
    fetch(`http://localhost:5000/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      alert('Livro excluído');
      setBooks(books.filter(book => book.id !== id)); // Atualiza a lista de livros após a exclusão
    })
    .catch(err => console.error('Erro ao excluir livro:', err));
  }

  return (
    <section className={styles.livros_container}>
      <h1>Aqui serão listados seus <span>livros</span></h1>
      {message && <Message msg={message} type='success' />}
      {books.map(book => (
        <CardBook
          id={book.id}
          livro={book.nome_livro}
          autor={book.nome_autor}
          categoria={book.category}  
          key={book.id}
          handlerRemove={removeBooks}
        />
      ))}
    </section>
  );
}

export default Livros;
