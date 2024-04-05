import React from 'react';
import styles from './Select.module.css';

function Select({ text, name, options, handlerOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <select name={name} id={name} onChange={handlerOnChange} value={value}>

        {options.map(option => ( 

          <option key={option.id} value={option.id}> // Adicionando key e value às opções

            {option.name} // Exibindo o nome da opção

          </option>

        ))}
      </select>
    </div>
  );
}

export default Select;
