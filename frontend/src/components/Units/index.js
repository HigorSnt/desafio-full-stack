import React, { useState, useContext, useEffect } from 'react';
import { Card, Empty, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import RegisterArea from '../RegisterArea';
import { useHistory } from 'react-router-dom';

import * as Actions from '../../constants';
import { registerUnit } from '../../services/api';
import { getCompany } from '../../services/api';
import CompanyContext from '../../contexts/CompanyContext';

function Units() {
  const { state, dispatch } = useContext(CompanyContext);
  const { companyId } = state;

  const [units, setUnits] = useState([]);
  const [register, setRegister] = useState(false);

  const history = useHistory();

  useEffect(() => getUnits(), [register]);

  async function getUnits() {
    let c = await getCompany(companyId);
    setUnits(c.units);
  }

  function handleNewUnit() {
    setRegister(true);
  }

  async function save(name) {
    await registerUnit(companyId, { name });
    setRegister(false);
  }

  function handleUnit(unit) {
    dispatch({ type: Actions.SET_UNIT_ID, payload: unit._id });
    history.push('/company/unit');
  }

  return (
    <>
      {!register &&
        units.map((unit, index) => (
          <Card
            key={index.toString()}
            hoverable
            bodyStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => handleUnit(unit)}
            style={{
              height: 80,
              marginTop: 30,
              borderRadius: 10,
            }}
          >
            <p className="company-name">{unit.name}</p>
          </Card>
        ))}

      {!register && units.length !== 0 && (
        <Card
          hoverable
          onClick={handleNewUnit}
          bodyStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          style={{ height: 80, marginTop: 30, borderRadius: 10 }}
        >
          <PlusCircleOutlined style={{ color: '#4169E1', fontSize: 25 }} />
          <p className="company-name">Adicionar uma nova unidade</p>
        </Card>
      )}

      {!register && units.length === 0 && (
        <Empty description="Nenhuma unidade cadastrada!">
          <Button type="primary" onClick={handleNewUnit}>
            Criar Unidade
          </Button>
        </Empty>
      )}

      {register && (
        <RegisterArea placeholder="Nome da Unidade" title="Digite o nome da unidade:" save={save} />
      )}
    </>
  );
}

export default Units;
