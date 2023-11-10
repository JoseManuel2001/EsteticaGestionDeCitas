import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

const SecondLogin = () => {
  const [codigo, setCodigo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleCodigoChange = (e) => {
    setCodigo(e.target.value);
  };
  const Navigate = useNavigate();
  const handleReenviarCodigo = () => {
    // Lógica para reenviar el código por correo
    setMensaje('Código reenviado por correo');
  };

  const handleValidarCodigo = () => {
    // Lógica para validar el código ingresado
    if (codigo === 'codigo_correcto') {
      setMensaje('Código válido. Acceso permitido.');
      Navigate("/App")
    } else {
      setMensaje('Código incorrecto. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Segundo Login</h2>
      <div>
        <label>Código recibido por correo:</label>
        <input type="text" value={codigo} onChange={handleCodigoChange} />
      </div>
      <div>
        <button onClick={handleReenviarCodigo}>Reenviar Código</button>
        <button onClick={handleValidarCodigo}>Validar Código</button>
      </div>
      <div>{mensaje}</div>
    </div>
  );
};

export default SecondLogin;