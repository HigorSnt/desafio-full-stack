import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Card, Input, Select, Button } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { getEmployees, createActive } from '../../services/api';

import './styles.css';
import CompanyContext from '../../contexts/CompanyContext';

const { Option } = Select;

function NewActive() {
  const { state } = useContext(CompanyContext);
  const { companyId, unitId } = state;

  const history = useHistory();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [model, setModel] = useState('');
  const [status, setStatus] = useState('');
  const [healthscore, setHealthscore] = useState();
  const [image, setImage] = useState('');
  const [responsible, setResponsible] = useState('');
  const [employees, setEmployees] = useState([]);
  const statusOptions = [
    { value: 'available', name: 'Disponível' },
    { value: 'disable', name: 'Desativado' },
    { value: 'inMaintenance', name: 'Em Manutenção' },
  ];

  useEffect(() => getCompanyEmployees(), []);

  async function getCompanyEmployees() {
    let e = await getEmployees(companyId);

    setEmployees(e);
  }

  async function save() {
    const data = {
      name,
      description,
      model,
      healthscore,
      image,
      status,
      responsible,
    };

    await createActive(unitId, data);
    history.push('/company');
  }

  return (
    <div className="container">
      <Card
        title={
          <div className="company-title">
            <h1>Cadastro de um novo ativo</h1>
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
      >
        <form>
          <label htmlFor="name">Nome do ativo:</label>
          <Input
            placeholder="Digite o nome do ativo"
            value={name}
            id="name"
            style={{ marginTop: 10, marginBottom: 10 }}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="description">Descrição do ativo:</label>
          <Input
            placeholder="Digite uma descrição para o ativo"
            value={description}
            id="description"
            style={{ marginTop: 10, marginBottom: 10 }}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="model">Modelo do ativo:</label>
          <Input
            placeholder="Digite o modelo do ativo"
            value={model}
            id="model"
            style={{ marginTop: 10, marginBottom: 10 }}
            onChange={(e) => setModel(e.target.value)}
          />
          <label htmlFor="healthscore">Healthscore do ativo:</label>
          <Input
            placeholder="Digite o healthscore do ativo"
            value={healthscore}
            id="healthscore"
            style={{ marginTop: 10, marginBottom: 10 }}
            onChange={(e) => setHealthscore(e.target.value)}
          />
          <label htmlFor="status">Status do ativo:</label>
          <Select
            style={{ width: '100%', marginTop: 10, marginBottom: 10 }}
            onChange={(e) => setStatus(e)}
          >
            {statusOptions.map((e) => (
              <Option key={e.value} value={e.value}>
                {e.name}
              </Option>
            ))}
          </Select>
          <label htmlFor="employee">Selecione o funcionário responsável pelo ativo:</label>
          <Select
            style={{ width: '100%', marginTop: 10, marginBottom: 10 }}
            onChange={(e) => setResponsible(e)}
          >
            {employees.map((e) => (
              <Option key={e._id} value={e._id}>
                {e.name}
              </Option>
            ))}
          </Select>
          <label htmlFor="image">URL da imagem do ativo:</label>
          <Input
            placeholder="Digite uma URL"
            value={image}
            id="image"
            style={{ marginTop: 10, marginBottom: 10 }}
            onChange={(e) => setImage(e.target.value)}
          />
          <Button onClick={save}>Cadastrar</Button>
        </form>
      </Card>
    </div>
  );
}

export default NewActive;
