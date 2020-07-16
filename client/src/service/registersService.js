import http from '../http-common';

const getAll = () => {
  return http.get('/api/transaction');
};

// const get = (id) => {
//   return http.get(`/grade/${id}`);
// };

const post = (data) => {
  return http.post('/api/transaction', data);
};

const put = (id, data) => {
  // return console.log(id, data);
  return http.put(`/api/transaction/${id}`, data);
};

const deleteId = (id) => {
  return http.delete(`/api/transaction/${id}`);
};

const removeAll = () => {
  return http.delete(`/grade`);
};

const findByName = (name) => {
  return http.get(`/grade/name?name=${name}`);
};

export default {
  getAll,
  // get,
  post,
  put,
  deleteId,
  removeAll,
  findByName,
};
