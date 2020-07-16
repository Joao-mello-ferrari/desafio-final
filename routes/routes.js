const express = require('express');
const transactionRouter = express.Router();

const {
  getResgister,
  postResgister,
  putResgister,
  deleteResgister,
} = require('../services/transactionService.js');

transactionRouter.get('/', getResgister);
transactionRouter.post('/', postResgister);
transactionRouter.put('/:id', putResgister);
transactionRouter.delete('/:id', deleteResgister);

module.exports = transactionRouter;
