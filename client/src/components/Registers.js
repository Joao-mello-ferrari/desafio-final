import React from 'react';
import Register from './Register.js';

export default function Resgisters({
  filter,
  allRegisters,
  selectedPeriod,
  onIconClick,
}) {
  const filterRegisters = () => {
    let filteredRegisters = allRegisters.filter((register) => {
      return (
        register.yearMonth === selectedPeriod &&
        register.description.toLowerCase().includes(filter.toLowerCase())
      );
    });

    const positiveRegisters = filteredRegisters
      .filter((register) => {
        return register.type === '+';
      })
      .sort((a, b) => {
        return b.value - a.value;
      });

    const negativeRegisters = filteredRegisters
      .filter((register) => {
        return register.type === '-';
      })
      .sort((a, b) => {
        return b.value - a.value;
      });

    filteredRegisters = positiveRegisters.concat(negativeRegisters);
    return filteredRegisters;
  };

  const handleIconClick = (id, type) => {
    onIconClick(id, type);
  };

  return (
    <div>
      <ul>
        {filterRegisters().map((register) => {
          return (
            <li key={register._id}>
              <Register register={register} onIconClick={handleIconClick} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
