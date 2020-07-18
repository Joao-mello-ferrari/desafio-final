import React, { useState, useEffect } from 'react';
import httpService from './service/registersService';

import Header from './components/Header';
import Filter from './components/Filter';
import Registers from './components/Registers';
import CreateModal from './components/CreateModal';
import EditModal from './components/EditModal';
import SubmmitModal from './components/SubmmitModal';

export default function App() {
  const [period, setPeriod] = useState('Selecione um período');
  const [allRegisters, setAllRegisters] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortType, setSortType] = useState('value');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmmitModalOpen, setIsSubmmitModalOpen] = useState(false);
  const [submmitModalMessage, setSubmmitModalMessage] = useState('');

  const [areThereNewRegisters, setAreThereNewRegisters] = useState(null);

  const [registerToEdit, setRegisterToEdit] = useState({});
  const [idToUpdate, setIdToUpdate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (areThereNewRegisters === null) {
        setSubmmitModalMessage('Carregando...');
        setIsSubmmitModalOpen(true);
      }

      let response = await httpService.getAll();
      response = response.data;

      setAllRegisters(response);
      setIsSubmmitModalOpen(false);
    };
    fetchData();
  }, [areThereNewRegisters]);

  const handlePeriodChange = (period) => {
    setPeriod(period);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleCreateButtonClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleModalClose = (type) => {
    if (type === 'edit') {
      setIsEditModalOpen(false);
    }
    if (type === 'create') {
      setIsCreateModalOpen(false);
    }
  };

  const handleIconClick = (id, type) => {
    if (type === 'edit') {
      let newRegisters = Object.assign([], allRegisters);
      newRegisters = allRegisters.filter((register) => register._id === id);
      setRegisterToEdit(newRegisters[0]);
      setIdToUpdate(id);
      setIsEditModalOpen(true);
      return;
    }
    handleSubmmit(id, 'delete');
  };

  const handleSubmmit = async (item, type) => {
    setIsSubmmitModalOpen(true);
    setSubmmitModalMessage('Realizando operação...');

    if (type === 'create') {
      setIsCreateModalOpen(false);
      const response = await httpService.post(item);
      setSubmmitModalMessage(response.data);
    }

    if (type === 'edit') {
      setIsEditModalOpen(false);
      const response = await httpService.put(idToUpdate, item);
      setSubmmitModalMessage(response.data);
    }

    if (type === 'delete') {
      const response = await httpService.deleteId(item);
      setSubmmitModalMessage(response.data);
    }
    setAreThereNewRegisters(!areThereNewRegisters);
  };

  const handleSelectChange = (type) => {
    setSortType(type);
  };

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
        onButtonClick={handleCreateButtonClick}
        onSelectChange={handleSelectChange}
        period={period}
      />
      <Registers
        filter={filter}
        allRegisters={allRegisters}
        selectedPeriod={period}
        onIconClick={handleIconClick}
        selectType={sortType}
      />
      {isCreateModalOpen && (
        <CreateModal onClose={handleModalClose} onSubmmit={handleSubmmit} />
      )}
      {isEditModalOpen && (
        <EditModal
          onClose={handleModalClose}
          onSubmmit={handleSubmmit}
          register={registerToEdit}
        />
      )}
      {isSubmmitModalOpen && <SubmmitModal message={submmitModalMessage} />}
    </div>
  );
}
