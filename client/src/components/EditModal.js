import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function EditModal({ register, onSubmmit, onClose }) {
  const { category, description, value, yearMonthDay, type } = register;

  const [newCategory, setNewCategory] = useState(category);
  const [newDescription, setNewDescription] = useState(description);
  const [newValue, setNewValue] = useState(value);
  const [newDate, setNewDate] = useState(yearMonthDay);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose('edit');
    }
  };

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };
  const handleValueChange = (event) => {
    let number = event.target.value;
    setNewValue(number);
  };
  const handleDateChange = (event) => {
    setNewDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newRegister = {
      description: newDescription,
      value: parseFloat(newValue),
      category: newCategory,
      year: parseInt(newDate.slice(0, 4)),
      month: parseInt(newDate.slice(5, 7)),
      day: parseInt(newDate.slice(8, 10)),
      yearMonth: newDate.slice(0, 7),
      yearMonthDay: newDate,
      type: type,
    };

    onSubmmit(newRegister, 'edit');
  };

  const handleCloseButtonClick = () => {
    onClose('edit');
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
                      checked={type === '+' ? true : false}
                      disabled={true}
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
                      checked={type === '-' ? true : false}
                      disabled={true}
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
                    value={newCategory}
                    onChange={handleCategoryChange}
                  ></input>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <span>Descrição</span>
                  <input
                    required
                    type="text"
                    value={newDescription}
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
                    value={newValue}
                    onChange={handleValueChange}
                  ></input>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <span>Data</span>
                  <input
                    type="date"
                    value={newDate}
                    onChange={handleDateChange}
                  ></input>
                </div>
              </div>
            </div>

            <button
              style={{ marginTop: '20px' }}
              className="waves-effect waves-light btn"
            >
              EDITAR REGISTRO
            </button>
          </form>
        </div>
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
