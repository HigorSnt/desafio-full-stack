import React, { useContext, useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import RegisterArea from '../RegisterArea';

import { createEmployee, getEmployees } from '../../services/api';
import CompanyContext from '../../contexts/CompanyContext';

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
  },
];

function EmployeesList() {
  const [register, setRegister] = useState(false);
  const [employees, setEmployees] = useState([]);

  const { state } = useContext(CompanyContext);
  const { companyId } = state;

  useEffect(() => get(), [register]);

  async function get() {
    let e = await getEmployees(companyId);
    setEmployees(e);
  }

  function handleRegister() {
    setRegister(true);
  }

  async function save(name, email) {
    await createEmployee(companyId, { name, email });
    setRegister(false);
  }

  return (
    <>
      {register && (
        <RegisterArea
          isUser
          placeholder="Digite o nome"
          placeholderEmail="Digite o email"
          title="Digite o nome:"
          titleEmail="Digite o email:"
          save={save}
        />
      )}
      {!register && (
        <Table
          columns={columns}
          dataSource={employees}
          pagination={false}
          locale={{ emptyText: 'Nenhum funcionário cadastrado!' }}
        />
      )}
      {!register && (
        <Button type="primary" onClick={handleRegister}>
          Cadastrar Empregado
        </Button>
      )}
    </>
  );
}

export default EmployeesList;
