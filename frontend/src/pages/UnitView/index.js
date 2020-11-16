import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'antd';

import { getUnit, getCompany } from '../../services/api';
import Actives from '../../components/Actives';
import CompanyContext from '../../contexts/CompanyContext';
import Statistics from '../../components/Statistics';

const tabList = [
  {
    key: 'ativos',
    tab: 'Ativos',
  },
  {
    key: 'estatisticas',
    tab: 'Estatísticas',
  },
];

function UnitView() {
  const { state } = useContext(CompanyContext);
  const { companyId, unitId } = state;

  const [key, setKey] = useState('ativos');
  const [company, setCompany] = useState();
  const [unit, setUnit] = useState();

  const contentList = {
    ativos: unit && <Actives companyId={companyId} active={unit.active} unitId={unitId} />,
    estatisticas: unit && <Statistics />,
  };

  useEffect(() => get(), []);

  async function get() {
    let result = await getCompany(companyId);
    setCompany(result);

    let unit = await getUnit(unitId);
    setUnit(unit);
  }

  return (
    <div className="company-view-container">
      {unit && (
        <Card
          title={
            <div className="company-title">
              <h1>{company.name + ' - Unidade ' + unit.name}</h1>
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
        >
          {contentList[key]}
        </Card>
      )}
    </div>
  );
}

export default UnitView;
