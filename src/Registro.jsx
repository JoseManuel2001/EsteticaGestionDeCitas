// Registro.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';

function Registro() {
    const [Nombre, setNombre] = useState('');
    const [Genero, setGenero] = useState('');
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
  
    const handleCancelar = () => {
      Navigate("/")
  }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:1337/api/usuarios', {"data":{
          Nombre,
          Genero,
          email,
          Password,
        }
        });
        console.log('Usuario registrado:', response.data);
        // Aquí puedes manejar la redirección o mostrar un mensaje de éxito al usuario
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
      }
    };
  return (
    <div>
      <h2>Registro</h2>
      <form >
        <label>
          Nombre:
          <input type="text" value={Nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <br />
        <label>
          Género:
          <input type="text" value={Genero} onChange={(e) => setGenero(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button onClick={handleSubmit} type="submit">Registrarse</button>
        <button onClick={handleCancelar} type="onClick">Cancelar</button>
      </form> 
    </div>
  );
}

export default Registro;