import React, { useState, useEffect } from 'react';
import httpService from './service/registersService';

import Header from './components/Header';
import Filter from './components/Filter';
import Registers from './components/Registers';
import Modall from './components/Modall';

export default function App() {
  const [period, setPeriod] = useState('Selecione um período');
  const [allRegisters, setAllRegisters] = useState([]);
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Modaltype, setModalType] = useState(null);
  const [areThereNewRegisters, setAreThereNewRegisters] = useState(null);
  const [registerToEdit, setRegisterToEdit] = useState({});
  const [idItemToDelete, setIdItemToDelete] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      if (areThereNewRegisters === null) {
        setIsModalOpen(true);
        setModalType('Start');
      }
      let response = await httpService.getAll();
      response = response.data;

      setAllRegisters(response);
      setIsModalOpen(false);
    };
    fetch();
  }, [areThereNewRegisters]);

  const handlePeriodChange = (period) => {
    setPeriod(period);
    console.log(period);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const addRegister = () => {
    setModalType('Adicionar Registro');
    setIsModalOpen(true);
    setRegisterToEdit('');
  };

  const handleModalClose = (state) => {
    if (!!state) {
      console.log(areThereNewRegisters);
      setAreThereNewRegisters(!areThereNewRegisters);
      return;
    }
    setIsModalOpen(false);
  };

  const handleIconClick = (id, type) => {
    if (type === 'edit') {
      let newRegisters = Object.assign([], allRegisters);
      newRegisters = allRegisters.filter((register) => register._id === id);
      setRegisterToEdit(newRegisters[0]);
      setModalType('Editar Registro');
      setIsModalOpen(true);
      return;
    }
    setModalType('Delete');
    setIdItemToDelete(id);
    setIsModalOpen(true);
  };

  // const handleDelete = async (id) => {
  //   setIsModalOpen(true);
  //   setModalType('Delete');
  //   const response = await httpService.deleteId(id);
  //   handleModalClose(true);
  // };

  return (
    <div>
      <h3 className="center">Desafio Final do Bootcamp Full Stack</h3>
      <h5 className="center" style={{ marginBottom: '30px' }}>
        Controle Financeiro Pessoal
      </h5>

      <Header
        onSelectChange={handlePeriodChange}
        selectedPeriod={period}
        allRegisters={allRegisters}
      />
      <Filter
        value={filter}
        onFilterChange={handleFilterChange}
        onButtonClick={addRegister}
      />
      <Registers
        filter={filter}
        allRegisters={allRegisters}
        selectedPeriod={period}
        onIconClick={handleIconClick}
      />
      {isModalOpen && (
        <Modall
          Type={Modaltype}
          onClose={handleModalClose}
          register={registerToEdit}
          idToDelete={idItemToDelete}
        />
      )}
    </div>
  );
}
