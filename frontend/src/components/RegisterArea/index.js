import React, { useState } from 'react';
import { Input, Button } from 'antd';

import './styles.css';

function RegisterArea({ title, placeholder, save }) {
  const [name, setName] = useState('');

  function handleChangeValue(e) {
    setName(e.target.value);
  }

  return (
    <div id="register-container">
      <span>{title}</span>
      <Input
        placeholder={placeholder}
        value={name}
        onChange={handleChangeValue}
        onPressEnter={() => save(name)}
      />
      <div id="register-button-area">
        <Button
          type="primary"
          style={{ width: 200, marginTop: 20 }}
          size="large"
          onClick={() => save(name)}
        >
          Cadastrar
        </Button>
      </div>
    </div>
  );
}

export default RegisterArea;
