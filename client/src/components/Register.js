import React from 'react';
import Icons from './Icons';
import formatNumber from './formatNumber';

export default function Register({ register, onIconClick }) {
  const { _id, description, value, category, type } = register;

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
      <div style={styles.text}>
        <strong>
          <span style={{ fontSize: '1.1rem' }}>{category}</span>
        </strong>
        <strong>
          <span style={{ fontSize: '1.1rem' }}>{description}</span>
        </strong>
      </div>

      <div>
        <strong>
          <span style={{ fontSize: '1.1rem' }}>
            R$ {formatNumber(String(value.toFixed(2)).replace('.', ','))}
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

    width: '50%',
  },

  main: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '70%',

    border: '1px solid lightGray',
    borderRadius: '5px',

    margin: '5px auto',
    padding: '10px 30px',
  },

  icons: {
    display: 'flex',
  },
};
