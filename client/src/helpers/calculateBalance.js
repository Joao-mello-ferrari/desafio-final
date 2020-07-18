export default function calculateBalance(type, allRegisters, selectedPeriod) {
  const filteredRegisters = allRegisters.filter((register) => {
    return register.yearMonth === selectedPeriod;
  });

  switch (type) {
    case '+':
      return balance(type);
    case '-':
      return balance(type);
    case 'sum':
      return balance('+') - balance('-');
    case 'length':
      return filteredRegisters.length;
    default:
      console.log('Tipo não aceito para o cálculo de balance');
  }

  function balance(type) {
    const balance = filteredRegisters
      .filter((register) => {
        return register.type === type;
      })
      .reduce((total, current) => {
        return total + current.value;
      }, 0);

    return balance;
  }
}
