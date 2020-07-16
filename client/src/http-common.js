import axios from 'axios';

//Define a URL base da origem para consumo do servico
export default axios.create({
  baseURL: 'http://localhost:3001/',
  // baseURL: 'https://desafio-final-fullstack.herokuapp.com/',
  headers: {
    'Content-type': 'application/json',
  },
});
