export default function createOptions(allRegisters) {
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
}
