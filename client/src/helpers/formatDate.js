export default function formatDate(date) {
  const year = date.slice(0, 4);
  const month = parseInt(date.slice(6, 8));
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

  const newMonth = months[month];

  const newDate = [newMonth, '/', year].join('');

  return newDate;
}
