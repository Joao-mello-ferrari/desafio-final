const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

mongoose.set('useFindAndModify', false);

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const getResgister = async (req, res) => {
  // const filterDate = req.body.yearMonth;
  try {
    const registers = await TransactionModel.find();
    res.send(registers);
  } catch (err) {
    res.status(500).send({ Err: err.message });
  }
};

const postResgister = async (req, res) => {
  const newRegister = req.body;
  try {
    const register = new TransactionModel(newRegister);
    await register.save();
    res.send('Registro realizado com sucesso');
  } catch (err) {
    res.status(500).send({ Err: err.message });
  }
};

const putResgister = async (req, res) => {
  const id = req.params.id;
  const resgisterToUpdate = req.body;
  try {
    const updatedRegister = await TransactionModel.findOneAndUpdate(
      { _id: id },
      resgisterToUpdate,
      { new: true }
    );
    res.send('Registro atualizado com sucesso');
  } catch (err) {
    res.status(500).send({ Err: err.message });
  }
};

const deleteResgister = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);
    await TransactionModel.findOneAndRemove({ _id: id });
    res.send('Registro deletado com sucesso');
  } catch (err) {
    res.status(500).send({ Err: err.message });
  }
};

module.exports = { getResgister, postResgister, putResgister, deleteResgister };
