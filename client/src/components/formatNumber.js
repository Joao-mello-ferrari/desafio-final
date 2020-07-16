export default function formatNumber(number) {
  let string = number.split('').reverse().join('');
  let floatPart = string.substr(0, 3).split('').reverse().join('');

  string = string.substr(3);
  let newString = string;
  let contador = 0;

  for (let i = 1; i < string.length; i++) {
    if (i % 3 === 0) {
      newString = [
        newString.slice(0, i + contador),
        '.',
        newString.slice(i + contador),
      ].join('');
      contador += 1;
    }
  }
  newString = newString.split('').reverse().join('');
  newString = [newString, floatPart].join('');

  return newString;
}
