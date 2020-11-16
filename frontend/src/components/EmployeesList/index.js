import React from 'react';
import { Table } from 'antd';

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

function EmployeesList({ employees }) {
  return (
    <Table
      columns={columns}
      dataSource={employees}
      pagination={false}
      locale={{ emptyText: 'Nenhum funcionário cadastrado!' }}
    />
  );
}

export default EmployeesList;
