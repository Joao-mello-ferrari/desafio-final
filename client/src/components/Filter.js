import React from 'react';

export default function Filter({ onFilterChange, value, onButtonClick }) {
  const handleInputChange = (event) => {
    console.log(event.target.value);
    onFilterChange(event.target.value);
  };

  const handleButtonClick = () => {
    onButtonClick(null);
  };

  return (
    <div style={styles.filter}>
      <button
        // className="waves-effect waves-light btn"
        style={styles.button}
        onClick={handleButtonClick}
      >
        + NOVO LANÇAMENTO
      </button>
      <input
        style={styles.text}
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Filtre seus registros pela descrição..."
      />
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
