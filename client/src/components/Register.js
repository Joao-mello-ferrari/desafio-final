import React from 'react';
import Icons from './Icons';
import formatNumber from '../helpers/formatNumber';

export default function Register({ register, onIconClick }) {
  const { _id, description, value, category, type, day } = register;

  const handleClick = (id, type) => {
    onIconClick(id, type);
  };

  return (
    <div
      style={{
        ...styles.main,
        ...{ backgroundColor: `${type === '+' ? '#82E0AA' : '#F1948A'}` },
      }}
    >
      <div style={{ width: '100px' }}>
        <strong>
          <span style={{ fontSize: '1.3rem' }}>
            {String(day).padStart(2, '0')}
          </span>
        </strong>
      </div>
      <div style={styles.text}>
        <strong>
          <span style={{ fontSize: '1.3rem' }}>{category}</span>
        </strong>
        <span style={{ fontSize: '0.9rem' }}>{description}</span>
      </div>

      <div style={{ width: '30%', display: 'flex', alignItems: 'flex-start' }}>
        <strong>
          <span style={{ fontSize: '1.1rem' }}>
            R$ {formatNumber(value, type)}
          </span>
        </strong>
      </div>

      <div style={styles.icons}>
        <Icons id={_id} type="edit" onIconClick={handleClick} />
        <Icons id={_id} type="delete" onIconClick={handleClick} />
      </div>
    </div>
  );
}

const styles = {
  text: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    marginRight: '80px',
  },

  main: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '60%',

    border: '1px solid lightGray',
    borderRadius: '5px',

    margin: '5px auto',
    padding: '10px 30px',
  },

  icons: {
    display: 'flex',
  },
};
