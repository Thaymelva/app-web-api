import { useEffect, useState } from 'react';
import Input from '../components/form/Input';
import { useNavigate } from 'react-router-dom';

import styles from './NovoLivro.module.css';
import Select from '../components/form/Select/Select';

function NovoLivro (){

    /* Objeto de Navegação */
    const navigate = useNavigate();

    /* State de Dados das Categorias Vindas do Arquivo db.json */
    const [categories, setCategories] = useState([]);

    /* State de Dados que Vai Armazenar Objeto Json de Livro */
    const [book, setBook] = useState({});
    
    /* Recupera os Dados de Categoria do Arquivo db.json */
    useEffect(() =>{
        fetch(
            'http://localhost:5000/categories',
            {
                method: 'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            }
        ).then(
            (response) => response.json()
        ).then(
            (data) =>{
                setCategories(data)
            }
        ).catch(
            (error) =>{
                console.log(error);
            }
        )
    }, []);
    
    /* Handler de Captura dos Dados de Input */
    function handlerChangeBook(event){

        setBook({...book, [event.target.name] : event.target.value});
        console.log(book)
    }

    /* Handler de Captura dos Dados de Select*/
    function handlerChangeCategory(event){

        setBook({...book, category:{
            id: event.target.value,
            category: event.target.options[event.target.selectedIndex].text
        }});
    }

    console.log(book)

    /* Inserção dos Dados de Livro */
    function createBook(book){

        fetch('http://localhost:5000/books', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(book)
        })
        .then(
            (resp)=>resp.json()
        )
        .then(
            (data)=>{
                console.log(data);
                navigate ('/livros', {state: 'Livro Cadastrado com Sucesso!'});
            }
        )
        .catch(
            (err)=>{
                console.log(err)
            }
        )
    }

    /* Função de Submit */
    function submit(event){
        event.preventDefault();
        createBook(book);
    }
    
    return(
        <section className={styles.novo_livro_container}>

            <h1>Cadastro de Livro</h1>

            <form onSubmit={submit}>

                <Input
                    type='text'
                    name='nome_livro'
                    id='nome_livro'
                    placeholder='digite o titulo do livro'
                    text='digite o titulo do livro'
                    handlerOnChange={handlerChangeBook}
                    />

                <Input
                    type='text'
                    name='nome_autor'
                    id='nome_autor'
                    placeholder='digite o nome do autor'
                    text='digite o nome do autor'
                    handlerOnChange={handlerChangeBook}
                    />

                <Input
                    type='text'
                    name='descricao'
                    id='descricao'
                    placeholder='digite uma descrição para o livro'
                    text='descrição'
                    handlerOnChange={handlerChangeBook}
                />

                {/* <p>
                    <input type='text' placeholder='Nome do Livro'/>
                </p>

                <p>
                    <input type='text' placeholder='Nome do Autor'/>
                </p>

                <p>
                    <input type='text' placeholder='Descrição do Livro'/>
                </p> */}
                
                <Select
                    name='categoria_id'
                    text='Categoria'
                    options={categories}
                    handlerOnChange={handlerChangeCategory}
                />

                <p>
                    <input type='submit' value='Cadastrar livro'/>
                </p>

            </form>
        </section>
    )
}

export default NovoLivro;