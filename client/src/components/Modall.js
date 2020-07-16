import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import httpService from '../service/registersService';
import Spinner from './Spinner';

Modal.setAppElement('#root');

export default function Modall({ onClose, Type, register, idToDelete }) {
  const { _id, category, description, value, type } = register;

  const [radioState, setRadioState] = useState(
    Type === 'Adicionar Registro' ? true : false
  );
  const [Category, setCategory] = useState('');
  const [Description, setDescription] = useState('');
  const [Value, setValue] = useState('');
  const [date, setDate] = useState(null);
  const [submmit, setSubmmited] = useState(
    Type === 'Delete' || Type === 'Start' ? true : false
  );
  const [submmitText, setSubmmitText] = useState('');
  const [enableSpinner, setEnableSpinner] = useState(true);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
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
    let number = event.target.value;
    setValue(number);
    var i = 123;
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const deleteItem = async () => {
    setSubmmitText('Realizando Operação');

    const response = await httpService.deleteId(idToDelete);
    setSubmmitText(response.data);
    setEnableSpinner(false);
    onClose(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newRegister = {
      description: Description,
      value: parseFloat(Value),
      category: Category,
      year: parseInt(date.slice(0, 4)),
      month: parseInt(date.slice(5, 7)),
      day: parseInt(date.slice(8, 10)),
      yearMonth: date.slice(0, 7),
      yearMonthDay: date,
      type: !register ? (radioState ? '+' : '-') : type,
    };

    setSubmmited(true);
    setSubmmitText('Realizando Operação');
    let response = null;
    if (!register) {
      response = await httpService.post(newRegister);
    } else {
      response = await httpService.put(_id, newRegister);
    }
    setSubmmitText(response.data);
    setEnableSpinner(false);
    onClose(true);
  };

  const handleCloseButtonClick = () => {
    onClose(null);
  };

  return (
    <div style={{ maxWidth: '200px', maxHeight: '200px' }}>
      <Modal isOpen={true}>
        {submmit ? (
          <div style={styles.submmit}>
            {Type === 'Start' ? (
              <h3 className="center">Carregando ...</h3>
            ) : (
              <h3 className="center" style={{ display: 'block' }}>
                {Type === 'Delete' && submmitText === ''
                  ? deleteItem()
                  : submmitText}
              </h3>
            )}
            {enableSpinner && <Spinner />}
            {!enableSpinner && (
              <img
                src="checked.jpg"
                alt="submmited sucessfully"
                width="170px"
                height="170px"
              />
            )}
          </div>
        ) : (
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
                        checked={
                          !register ? radioState : type === '+' ? true : false
                        }
                        disabled={Type === 'Adicionar Registro' ? false : true}
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
                        checked={
                          !register ? radioState : type === '-' ? true : false
                        }
                        disabled={Type === 'Adicionar Registro' ? false : true}
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
                      placeholder={
                        !register
                          ? 'Mercado, Receita, Lazer, Transporte'
                          : category
                      }
                      value={Category}
                      onChange={handleCategoryChange}
                    ></input>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <span>Descrição</span>
                    <input
                      required
                      type="text"
                      placeholder={!register ? '' : description}
                      value={Description}
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
                      value={Value}
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
                {Type}
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
