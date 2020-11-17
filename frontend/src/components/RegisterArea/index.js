import React, { useState } from 'react';
import { Input, Button } from 'antd';

import './styles.css';

function RegisterArea({ title, placeholder, save, isUser, placeholderEmail, titleEmail }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleChangeValue(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <div id="register-container">
      <span>{title}</span>
      <Input placeholder={placeholder} value={name} onChange={handleChangeValue} />
      {isUser && (
        <>
          <span>{titleEmail}</span>
          <Input placeholder={placeholderEmail} value={email} onChange={handleChangeEmail} />
        </>
      )}
      <div id="register-button-area">
        <Button
          type="primary"
          style={{ width: 200, marginTop: 20 }}
          size="large"
          onClick={() => save(name, email)}
        >
          Cadastrar
        </Button>
      </div>
    </div>
  );
}

export default RegisterArea;
