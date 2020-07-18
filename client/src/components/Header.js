import React from 'react';
import formatNumber from '../helpers/formatNumber';
import createPeriods from '../helpers/createPeriods';
import calculateBalance from '../helpers/calculateBalance';
import formatDate from '../helpers/formatDate';

export default function Header({
  onSelectChange,
  selectedPeriod,
  allRegisters,
}) {
  const handleSelectChange = (event) => {
    onSelectChange(event.target.value);
  };

  return (
    <div className="center">
      <div className="input-field col s12" style={{ marginTop: '50px' }}>
        <select
          value={selectedPeriod}
          style={{ display: 'inline', maxWidth: '200px' }}
          onChange={handleSelectChange}
        >
          <option disabled value="Selecione um período">
            Selecione um período
          </option>
          {createPeriods(allRegisters).map((item) => {
            return (
              <option
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '500',
                }}
                key={item}
                value={item}
              >
                {formatDate(item)}
              </option>
            );
          })}
        </select>
      </div>

      <div style={styles.header}>
        <div>
          <label style={styles.labels} htmlFor="lançamentos">
            Lançamentos (nº):
          </label>
          <span id="lançamentos" style={{ color: 'black' }}>
            <strong>
              {calculateBalance('length', allRegisters, selectedPeriod)}
            </strong>
          </span>
        </div>
        <div>
          <label style={styles.labels} htmlFor="receita">
            Receita (R$):
          </label>
          <span id="receita" style={{ color: 'green' }}>
            {formatNumber(
              calculateBalance('+', allRegisters, selectedPeriod),
              '+'
            )}
          </span>
        </div>
        <div>
          <label style={styles.labels} htmlFor="despesas">
            Despesas (R$):
          </label>
          <span id="despesas" style={{ color: 'red' }}>
            {formatNumber(
              calculateBalance('-', allRegisters, selectedPeriod),
              '-'
            )}
          </span>
        </div>
        <div>
          <label style={styles.labels} htmlFor="saldo">
            Saldo (R$):
          </label>
          <span
            id="saldo"
            style={{
              color: `${
                calculateBalance('sum', allRegisters, selectedPeriod) >= 0
                  ? 'green'
                  : 'red'
              }`,
            }}
          >
            {formatNumber(
              Math.abs(calculateBalance('sum', allRegisters, selectedPeriod)),
              calculateBalance('sum', allRegisters, selectedPeriod) >= 0
                ? '+'
                : '-'
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',

    margin: '50px 70px',

    border: '1px solid lightGray',
    borderRadius: '5px',
    padding: '15px',

    backgroundColor: 'rgb(240,240,240)',
  },

  labels: {
    fontSize: '1.1rem',
    color: 'black',
    marginRight: '3px',
  },
};
