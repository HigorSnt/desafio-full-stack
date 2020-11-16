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
  const [image, setImage] = useState(null);
  const [responsible, setResponsible] = useState('');
  const [employees, setEmployees] = useState([]);
  const statusOptions = [
    { value: 'available', name: 'Disponível' },
    { value: 'disable', name: 'Desativado' },
    { value: 'inMaintenance', name: 'Em Manutenção' },
  ];

  useEffect(() => getCompanyEmployees(), []);

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);

  async function getCompanyEmployees() {
    let e = await getEmployees(companyId);

    setEmployees(e);
  }

  async function save() {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('model', model);
    data.append('healthscore', healthscore);
    data.append('image', image);
    data.append('status', status);
    data.append('responsible', responsible);

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
          <label
            id="image"
            style={{ backgroundImage: `url(${preview})` }}
            className={image ? 'has-image' : ''}
          >
            <input type="file" onChange={(event) => setImage(event.target.files[0])} />
            <CameraOutlined style={{ fontSize: 40 }} />
          </label>
          <Button onClick={save}>Cadastrar</Button>
        </form>
      </Card>
    </div>
  );
}

export default NewActive;
