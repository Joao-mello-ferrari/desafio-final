import React, { useState } from 'react';
import formatNumber from './formatNumber';

export default function Header({
  onSelectChange,
  selectedPeriod,
  allRegisters,
}) {
  const handleSelectChange = (event) => {
    onSelectChange(event.target.value);
  };

  const calculateBalance = (filter) => {
    const filteredRegisters = allRegisters.filter((register) => {
      return register.yearMonth === selectedPeriod;
    });

    if (filter) {
      const balance = filteredRegisters
        .filter((register) => {
          return register.type === filter;
        })
        .reduce((total, current) => {
          return total + current.value;
        }, 0);

      return balance;
    } else if (filter === null) {
      return filteredRegisters.length;
    } else {
      return calculateBalance('+') - calculateBalance('-');
    }
  };

  const createOptions = () => {
    const periodsSet = new Set();

    allRegisters.forEach((register) => {
      return periodsSet.add(register.yearMonth);
    });

    let periodsArray = Array.from(periodsSet);

    periodsArray = periodsArray
      .sort((a, b) => {
        return a.slice(5, 7) - b.slice(5, 7);
      })
      .sort((a, b) => {
        return a.slice(0, 4) - b.slice(0, 4);
      });

    return periodsArray;
  };

  return (
    <div className="center">
      <div className="input-field col s12" style={{ marginTop: '50px' }}>
        <select
          value={selectedPeriod}
          style={{ display: 'inline', maxWidth: '200px' }}
          onChange={handleSelectChange}
          placeholder="ola"
        >
          <option disabled value="Selecione um período">
            Selecione um período
          </option>
          {createOptions().map((item) => {
            return (
              <option
                style={{
                  fontSize: '1.2rem',
                  padding: '1px',
                }}
                key={item}
                value={item}
              >
                {item.replace('-', '/')}
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
            <strong>{calculateBalance(null)}</strong>
          </span>
        </div>
        <div>
          <label style={styles.labels} htmlFor="receita">
            Receita (R$):
          </label>
          <span id="receita" style={{ color: 'green' }}>
            {formatNumber(
              String(calculateBalance('+').toFixed(2).replace('.', ','))
            )}
          </span>
        </div>
        <div>
          <label style={styles.labels} htmlFor="despesas">
            Despesas (R$):
          </label>
          <span id="despesas" style={{ color: 'red' }}>
            {formatNumber(
              String(calculateBalance('-').toFixed(2).replace('.', ','))
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
              color: `${calculateBalance('') >= 0 ? 'green' : 'red'}`,
            }}
          >
            {formatNumber(
              String(calculateBalance('').toFixed(2).replace('.', ','))
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
