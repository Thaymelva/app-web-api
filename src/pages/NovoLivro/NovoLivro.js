import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';

import styles from './NovoLivro.module.css';

function NovoLivro() {

  // OBJETO DE NAVEGAÇÃO
  const navigate = useNavigate();

  // STATE DE DADOS DE CATEGORIAS VINDAS DO ARQUIVO db.json
  const [categories, setCategories] = useState([]);

  /* STATE DE DADOS QUE VAI ARMAZENAR O OBJETO JSON DE LIVROS */
  const [book, setBook] = useState({});

  // RECUPERA OS DADOS DE CATEGORIA DO ARQUIVO db.json
  useEffect(()=>{
    fetch
        ('http://localhost:5000/categories',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) =>resp.json()
        ).then(
          (data)=>{
            setCategories(data)
            console.log(data)
          }
        )
      .catch((error) => {
        console.log(error)
      })
  },[])

  // HANDLER DE CAPTURA DOS DADOS DE INPUT (NOME, LIVRO, AUTOR, DESCRIÇÃO)
    function handlerChangeBook(event) {
      setBook({...book, [event.target.name] : event.target.value});
      console.log(book);
    }

  // HANDLER DE CAPTURA DOS DADOS DE SELECT (ID E CATEGORIA)
    function handlerChangeCategory(event) {
      setBook({...book, category:{
        id: event.target.value,
        category: event.target.options[event.target.selectedIndex].text
      }});
    }
    console.log(book);

    /* INSERÇÃO DOS DADOS DE LIVRO */
    function createBook(book) {
      fetch('http://localhost:5000/books', {
        method: 'POST',
            headers: {
                'Content-Type': 'aplication/json',
            },
            body: JSON.stringify(book)
      })
      .then(
        (resp)=>resp.json()
      )
      .then(
        (data)=>{
          console.log(data)
          navigate('/Livros', {state: 'Livro cadastrado com sucesso!'});
        }
      )
      .catch(
        (err)=>{ console.log(err) }
      )
    }

    /*FUNÇÃO DE SUBMIT*/
    function submit(event) {
      event.preventDefault();
      createBook(book);
    }

  return (
    <section className={styles.novolivros_container}>
      <h1>Cadastre livro</h1>

      <form onSubmit={submit}>

        {/*<p>
          <input type="text" placeholder="Nome do livro" id="" />
        </p> */}
        <Input
            type="text"
            name="nome_livro"
            id="nome_livro"
            placeholder="Digite o titulo do livro"
            text="Digite o título do livro:"
            handlerOnChange={handlerChangeBook}
        />

        {/*<p>
            <input type="text" placeholder="Nome do autor" id="" />
        </p> */}
        <Input
            type="text"
            name="nome_autor"
            id="nome_autor"
            placeholder="Digite o nome do autor"
            text="Digite o nome do autor:"
            handlerOnChange={handlerChangeBook}
        />

        {/*

        <p>
          <input type="text" placeholder="Descriçao do livro" id="" />
        </p> */}
        <Input
            type="text"
            name="descricao_livro"
            id="descricao_livro"
            placeholder="Digite a descricao do livro"
            text="Digite a descrição do livro:"
            handlerOnChange={handlerChangeBook}
        />

        <Select
            name="categoria-id"
            text="Selecione a categoria do livro:"
            options={categories}
            handlerOnChange={handlerChangeCategory}
        />

        <p>
          <button type="submit">Cadastrar livro</button>
        </p>
      </form>
    </section>
  )
}

export default NovoLivro;