export default function filterRegisters(
  filter,
  allRegisters,
  selectedPeriod,
  type
) {
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

  if (type === 'day') {
    filteredRegisters = filteredRegisters.sort((a, b) => {
      return parseInt(a.day) - parseInt(b.day);
    });
  }

  return filteredRegisters;
}
