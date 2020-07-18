import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function CreateModal({ onSubmmit, onClose }) {
  const [radioState, setRadioState] = useState(true);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(null);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose('create');
    }
  };

  const handleRadioClick = (event) => {
    event.target.id === 'receita' ? setRadioState(true) : setRadioState(false);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRegister = {
      description: description,
      value: parseFloat(value),
      category: category,
      year: parseInt(date.slice(0, 4)),
      month: parseInt(date.slice(5, 7)),
      day: parseInt(date.slice(8, 10)),
      yearMonth: date.slice(0, 7),
      yearMonthDay: date,
      type: radioState ? '+' : '-',
    };

    onSubmmit(newRegister, 'create');
  };

  const handleCloseButtonClick = () => {
    onClose('create');
  };

  return (
    <div style={{ maxWidth: '200px', maxHeight: '200px' }}>
      <Modal isOpen={true}>
        <div style={styles.main}>
          <button
            style={styles.closeButton}
            className="waves-effect waves-light btn red"
            onClick={handleCloseButtonClick}
          >
            FECHAR
          </button>

          <form onSubmit={handleSubmit}>
            <div>
              <div style={styles.radio}>
                <p style={{ marginRight: '60px' }}>
                  <label>
                    <input
                      name="group1"
                      type="radio"
                      id="receita"
                      checked={radioState}
                      disabled={false}
                      onChange={handleRadioClick}
                    />
                    <span style={{ fontSize: '1.2rem' }}>
                      <strong>Receita</strong>
                    </span>
                  </label>
                </p>

                <p>
                  <label>
                    <input
                      name="group1"
                      type="radio"
                      id="despesa"
                      checked={!radioState}
                      disabled={false}
                      onChange={handleRadioClick}
                    />
                    <span style={{ fontSize: '1.2rem' }}>
                      <strong>Despesa</strong>
                    </span>
                  </label>
                </p>
              </div>

              <div>
                <div style={{ marginBottom: '10px' }}>
                  <span>Categoria</span>
                  <input
                    required
                    type="text"
                    value={category}
                    onChange={handleCategoryChange}
                  ></input>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <span>Descrição</span>
                  <input
                    required
                    type="text"
                    // placeholder={!register ? '' : description}
                    value={description}
                    onChange={handleDescriptionChange}
                  ></input>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <span>Valor</span>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    value={value}
                    onChange={handleValueChange}
                  ></input>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <span>Data</span>
                  <input type="date" onChange={handleDateChange}></input>
                </div>
              </div>
            </div>

            <button
              style={{ marginTop: '20px' }}
              className="waves-effect waves-light btn"
            >
              CADASTRAR REGISTRO
            </button>
          </form>
        </div>
        )}
      </Modal>
    </div>
  );
}

const styles = {
  submmit: {
    display: 'flex',
    flexDirection: 'column',

    alignItems: 'center',
    margin: 'auto',
    padding: '100px 0',
  },

  main: {
    padding: '65px',
  },
  closeButton: {
    marginBottom: '20px',
  },

  radio: {
    display: 'flex',
    justifyContent: 'center',

    margin: '30px 0',
  },
};
