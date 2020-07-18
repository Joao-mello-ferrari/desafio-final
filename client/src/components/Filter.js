import React, { useState } from 'react';

export default function Filter({
  onFilterChange,
  value,
  onButtonClick,
  onSelectChange,
  period,
}) {
  const [selectedOption, setSelectedOption] = useState('inicial');

  const handleInputChange = (event) => {
    onFilterChange(event.target.value);
  };

  const handleButtonClick = (event) => {
    onButtonClick(event.target.id);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    onSelectChange(event.target.value);
  };

  return (
    <div style={styles.filter}>
      <button id="create" style={styles.button} onClick={handleButtonClick}>
        + NOVO LANÇAMENTO
      </button>

      <input
        style={styles.text}
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Filtre seus registros pela descrição..."
        disabled={period === 'Selecione um período' ? true : false}
      />

      <select
        value={selectedOption}
        style={{ display: 'inline', maxWidth: '300px', marginLeft: '100px' }}
        onChange={handleSelectChange}
        disabled={period === 'Selecione um período' ? true : false}
      >
        <option disabled value="inicial">
          Selecione um tipo ordenação
        </option>
        <option value="value">Valor</option>
        <option value="day">Dia</option>
        <option value="category">Categoria</option>
        <option value="description">Descrição</option>
      </select>
    </div>
  );
}

const styles = {
  filter: {
    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'flex-start',

    margin: '60px 50px',
  },

  text: {
    maxWidth: '450px',
    marginLeft: '20px',
  },

  button: {
    backgroundColor: '#138D75',
    borderRadius: '5px',

    border: '1px solid #0B5345  ',

    color: 'white',
    fontWeigth: 'bold',

    cursor: 'pointer',
  },
};
