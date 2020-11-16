import React from 'react';
import { Card } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

function Actives({ active }) {
  const history = useHistory();

  return (
    <>
      {active.map((item, index) => (
        <Card
          key={index.toString()}
          hoverable
          style={{ display: 'flex', alignItems: 'center', marginBottom: 30 }}
          cover={<img src={`${item.imageUrl}`} alt={item.name} style={{ width: 250 }} />}
        >
          <p>
            <strong>Nome:</strong> {' ' + item.name}
          </p>
          <p>
            <strong>Descrição:</strong> {' ' + item.description}
          </p>
          <p>
            <strong>Modelo:</strong> {' ' + item.model}
          </p>
          <p>
            <strong>Responsável:</strong> {' ' + item.responsible.name}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            {item.status === 'available' ? (
              <span style={{ color: 'green' }}>Disponível</span>
            ) : item.status === 'disable' ? (
              <span style={{ color: 'red' }}>Desativado</span>
            ) : (
              <span style={{ color: 'orange' }}>Em manutenção</span>
            )}
          </p>
          <p>
            <strong>Health Score:</strong> {' ' + item.healthscore}
          </p>
        </Card>
      ))}
      <Card
        hoverable
        bodyStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        onClick={() => history.push('/company/unit/active')}
      >
        <PlusCircleOutlined style={{ fontSize: 25 }} />
        <h2>Adicionar um ativo</h2>
      </Card>
    </>
  );
}

export default Actives;
