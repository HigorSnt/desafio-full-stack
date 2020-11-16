import React, { useEffect, useContext, useState } from 'react';
import { Card, Skeleton } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import * as Actions from '../../constants';
import CompanyContext from '../../contexts/CompanyContext';
import { getAllCompanies } from '../../services/api';
import companyIcon from '../../assets/office.svg';

import './styles.css';

function ListCompanies() {
  const history = useHistory();

  const { dispatch } = useContext(CompanyContext);

  const [companies, setCompanies] = useState([{}, {}, {}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => getCompanies(), []);

  async function getCompanies() {
    let result = await getAllCompanies();

    setLoading(false);
    setCompanies(result);
  }

  function handleViewCompany(company) {
    dispatch({ type: Actions.SET_COMPANY_ID, payload: company._id });
    history.push('/company');
  }

  function handleRegisterCompany() {
    history.push('register');
  }

  return (
    <div className="companies-list">
      {companies.map((company, index) => (
        <Card
          hoverable
          key={index.toString()}
          onClick={() => handleViewCompany(company)}
          bodyStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          style={{ width: 800, height: 80, marginTop: 30, borderRadius: 10 }}
        >
          <Skeleton loading={loading} active />
          {!loading && <img src={companyIcon} width={30} height={30} />}
          <p className="company-name">{company.name}</p>
        </Card>
      ))}
      {!loading && (
        <Card
          hoverable
          onClick={handleRegisterCompany}
          bodyStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          style={{ width: 800, height: 80, marginTop: 30, borderRadius: 10 }}
        >
          <PlusCircleOutlined style={{ color: '#4169E1', fontSize: 25 }} />
          <p className="company-name">Adicionar uma nova empresa</p>
        </Card>
      )}
    </div>
  );
}

export default ListCompanies;
