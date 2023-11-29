import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../src/Styles/Login.css';
import { UserContext } from './UserContext';
import { useContext } from 'react';

function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    Genero: '',
    Nombre: '',
    Password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegistrarSubmit = () => {
    navigate('/Registro');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos obligatorios no estén vacíos
    if (!loginData.Nombre || !loginData.Password) {
      setError('Completa todos los campos.');
      return;
    }

    axios
      .get('http://localhost:1337/api/usuarios')
      .then((response) => {
        const mappedUsers = response.data.data.map((user) => ({
          Genero: user.attributes.Genero,
          Nombre: user.attributes.Nombre,
          Password: user.attributes.Password,
          Role: user.attributes.Role
        }));

        const isValidUser = mappedUsers.some(
          (user) => user.Nombre === loginData.Nombre && user.Password === loginData.Password
        );

        if (isValidUser) {
          const user = mappedUsers.find(
            (user) => user.Nombre === loginData.Nombre && user.Password === loginData.Password
          );

          console.log('Inicio de sesión exitoso');
          login(user);

          // Verificar el rol y navegar en consecuencia
          if (user.Role === 'Admin') {
            navigate('/App');
          } else {
            navigate('/LoginS');
          }
        } else {
          console.log('Credenciales incorrectas');
          setError('Credenciales incorrectas');
        }
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error);
        setError('Error al obtener datos. Por favor, inténtalo de nuevo.');
      });
  };

  return (
    <>
      <div className="Login">
        <form className="FormLogin">
          <h1>Inicio de Sesión</h1>
          <h1>Agu's look</h1>
          <input
            type="text"
            name="Nombre"
            placeholder="Usuario:"
            value={loginData.Nombre}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="Password"
            placeholder="Password:"
            value={loginData.Password}
            onChange={handleChange}
            required
          />
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleLoginSubmit} type="submit">
            Iniciar Sesión
          </button>
          <button onClick={handleRegistrarSubmit} type="submit">
            Registrarse
          </button>
        </form>
        <br />
      </div>
    </>
  );
}

export default Login;



