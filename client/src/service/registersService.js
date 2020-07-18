import http from '../http-common';

const getAll = () => {
  return http.get('/api/transaction');
};

const post = (data) => {
  return http.post('/api/transaction', data);
};

const put = (id, data) => {
  return http.put(`/api/transaction/${id}`, data);
};

const deleteId = (id) => {
  return http.delete(`/api/transaction/${id}`);
};

export default {
  getAll,
  post,
  put,
  deleteId,
};
