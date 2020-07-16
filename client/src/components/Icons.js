import React from 'react';

export default function Icons({ id, type, onIconClick }) {
  const handleClick = () => {
    onIconClick(id, type);
  };

  return (
    <div style={{ margin: '0 3px' }}>
      <span
        className="material-icons"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        {type}
      </span>
    </div>
  );
}
