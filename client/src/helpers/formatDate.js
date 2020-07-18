export default function formatDate(date) {
  const year = date.slice(0, 4);
  const month = parseInt(date.slice(5, 7));
  const months = [
    'jan',
    'fev',
    'mar',
    'abr',
    'mai',
    'jun',
    'jul',
    'ago',
    'set',
    'out',
    'nov',
    'dez',
  ];

  const newMonth = months[month - 1];

  const newDate = [newMonth, '/', year].join('');

  return newDate;
}
