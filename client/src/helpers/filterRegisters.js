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

  switch (type) {
    case 'day':
      filteredRegisters = filteredRegisters.sort((a, b) => {
        return parseInt(a.day) - parseInt(b.day);
      });
      break;

    case 'category':
      filteredRegisters = filteredRegisters.sort((a, b) => {
        return a.category.toLowerCase().localeCompare(b.category.toLowerCase());
      });
      break;

    case 'description':
      filteredRegisters = filteredRegisters.sort((a, b) => {
        return a.description
          .toLowerCase()
          .localeCompare(b.description.toLowerCase());
      });
      break;

    case 'value':
      break;

    default:
      console.log('Não foi encontrado filtro para o option fornecido');
      break;
  }

  return filteredRegisters;
}
