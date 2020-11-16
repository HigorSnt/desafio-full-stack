import React from 'react';
import { useHistory } from 'react-router-dom';

import RegisterArea from '../../components/RegisterArea';

import { registerCompany } from '../../services/api';

function RegisterCompany() {
  const history = useHistory();

  async function saveCompany(name) {
    await registerCompany({ name });
    history.push('/');
  }

  return (
    <RegisterArea
      title="Digite o nome da empresa:"
      placeholder="Nome da empresa"
      save={saveCompany}
    />
  );
}

export default RegisterCompany;
