import React, { useEffect, useState, useContext } from 'react';
import { Card } from 'antd';

import CompanyContext from '../../contexts/CompanyContext';
import Units from '../../components/Units';
import { getCompany } from '../../services/api';
import EmployeesList from '../../components/EmployeesList';

import './styles.css';

const tabList = [
  {
    key: 'unidades',
    tab: 'Unidades',
  },
  {
    key: 'empregados',
    tab: 'Empregados',
  },
];

function CompanyView() {
  const { state } = useContext(CompanyContext);
  const { companyId } = state;

  const [key, setKey] = useState('unidades');
  const [company, setCompany] = useState();

  const contentList = {
    unidades: company && <Units units={company.units} />,
    empregados: company && <EmployeesList employees={company.employees} />,
  };

  useEffect(() => get(), []);

  async function get() {
    let result = await getCompany(companyId);
    setCompany(result);
  }

  return (
    <div className="company-view-container">
      {company && (
        <Card
          title={
            <div className="company-title">
              <h1>{company.name}</h1>
            </div>
          }
          bordered={false}
          style={{
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            margin: '50',
          }}
          tabList={tabList}
          onTabChange={(key) => setKey(key)}
          activeTabKey={key}
          tabbarstyle={{ color: '#000' }}
        >
          {contentList[key]}
        </Card>
      )}
    </div>
  );
}

export default CompanyView;
