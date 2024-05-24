import styles from './EditarLivro.module.css';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/form/Input';
import Select from '../components/form/Select/Select';

function EditarLivro() {
    const [categories, setCategories] = useState([]);
    const [book, setBook] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
          .then(data => setCategories(data))
          .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/book/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
          .then(data => {
              setBook(data);
              console.log(data);
          }).catch(err => console.log(err));
    }, [id]);

    function handleChangeBook(event) {
        setBook({ ...book, [event.target.name]: event.target.value });
    }

    function handleChangeCategory(event) {
        setBook({
            ...book,
            category: {
                id: event.target.value,
                category: event.target.options[event.target.selectedIndex].text
            }
        });
    }

    function editBook(book) {
        fetch(`http://localhost:5000/book/${book.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        }).then(resp => resp.json())
          .then(data => {
              setBook(data);
              navigate('/livros', { state: 'Livro alterado com sucesso!' });
          }).catch(err => console.log(err));
    }

    function handleSubmit(event) {
        event.preventDefault();
        editBook(book);
    }

    return (
        <div className={styles.book_container}>
            <h1>Edição de Livros</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type='text'
                    name='nome_livro'
                    id='nome_livro'
                    placeholder='Digite o título do livro'
                    text='Título do Livro'
                    value={book.nome_livro}
                    handlerOnChange={handleChangeBook}
                />
                <Input
                    type='text'
                    name='nome_autor'
                    id='nome_autor'
                    placeholder='Digite o nome do autor'
                    text='Nome do Autor'
                    value={book.nome_autor}
                    handlerOnChange={handleChangeBook}
                />
                <Input
                    type='text'
                    name='descricao'
                    id='descricao'
                    placeholder='Digite uma descrição para o livro'
                    text='Descrição'
                    value={book.descricao}
                    handlerOnChange={handleChangeBook}
                />
                <Select
                    name='categoria_id'
                    text='Categoria'
                    options={categories}
                    handlerOnChange={handleChangeCategory}
                />
                <p><Input type='submit' value='Editar Livro' /></p>
            </form>
        </div>
    );
}

export default EditarLivro;
