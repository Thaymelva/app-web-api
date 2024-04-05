import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/Input';
import Select from '../../components/form/Select';
import styles from './NovoLivro.module.css';

export default function NovoLivro() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => {
      setCategories(data);
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <section className={styles.novolivros_container}>
      <h1>Novo livro</h1>

      <form>
        <Input
          type="text"
          name="nome_livro"
          id="nome_livro"
          placeholder="Digite o título do livro"
          text="Digite o título do livro"
        />

        <Input
          type="text"
          name="nome_autor"
          id="nome_autor"
          placeholder="Digite o nome do autor"
          text="Digite o nome do autor"
        />

        <Input
          type="text"
          name="descricao_livro"
          id="descricao_livro"
          placeholder="Digite a descrição do livro"
          text="Digite a descrição do livro"
        />

        <Select
          name="categoria_id"
          text="Selecione a categoria do livro"
          options={categories}
          handlerOnChange={(e) => console.log(e.target.value)}
          value=""
        />

        <p>
          <input type="submit" value="Cadastrar livro" />
        </p>
      </form>
    </section>
  );
}
