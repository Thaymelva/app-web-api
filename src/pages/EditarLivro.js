import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../components/Input/Input'; // Corrigido o caminho de importação
import Select from '../components/Select/Select'; // Corrigido o caminho de importação
import styles from './EditarLivro.module.css'; 

function EditarLivro() {
    const { id } = useParams();
    const navigate = useNavigate(); // Para navegar após a criação
    console.log('ID:', id);

    const [book, setBook] = useState({
        nome_livro: '',
        nome_autor: '',
        descricao_livro: '',
        categoria_id: ''
    });

    const [categories, setCategories] = useState([]); 
    useEffect(() => {
        // Buscar informações do livro para edição
        console.log("Buscando dados do livro com ID:", id);
        // Aqui deve ser inserida a lógica para buscar os dados do livro
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook(prev => ({ ...prev, [name]: value }));
    };

    function createBook(bookData) {
        fetch('http://localhost:5000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Corrigido o typo em 'application'
            },
            body: JSON.stringify(bookData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate('/Livros', { state: 'Livro cadastrado com sucesso!' });
        })
        .catch(err => console.log(err));
    }

    return (
        <div className={styles.book_container}>
            <h1>Edição de livro!</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                createBook(book);
            }}>
                <Input
                    type="text"
                    name="nome_livro"
                    id="nome_livro"
                    placeholder="Digite o título do livro"
                    text="Digite o título do livro:"
                    value={book.nome_livro}
                    handlerOnChange={handleChange}
                />
                <Input
                    type="text"
                    name="nome_autor"
                    id="nome_autor"
                    placeholder="Digite o nome do autor"
                    text="Digite o nome do autor:"
                    value={book.nome_autor}
                    handlerOnChange={handleChange}
                />
                <Input
                    type="text"
                    name="descricao_livro"
                    id="descricao_livro"
                    placeholder="Digite a descrição do livro"
                    text="Digite a descrição do livro:"
                    value={book.descricao_livro}
                    handlerOnChange={handleChange}
                />
                <Select
                    name="categoria_id"
                    text="Selecione a categoria do livro:"
                    options={categories} 
                    value={book.categoria_id}
                    handlerOnChange={handleChange}
                />
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default EditarLivro;
