import React from 'react';
import Register from './Register.js';
import filterRegisters from '../helpers/filterRegisters';

export default function Resgisters({
  filter,
  allRegisters,
  selectedPeriod,
  onIconClick,
  selectType,
}) {
  const handleIconClick = (id, type) => {
    onIconClick(id, type);
  };

  return (
    <div>
      <ul>
        {filterRegisters(filter, allRegisters, selectedPeriod, selectType).map(
          (register) => {
            return (
              <li key={register._id}>
                <Register register={register} onIconClick={handleIconClick} />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
