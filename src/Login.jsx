import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';




function Login() {

    
    const Navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        Genero: '',
        Nombre: '',
        Password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleRegistrarSubmit = () => {
      Navigate("/Registro")
  }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        axios.get('http://localhost:1337/api/usuarios')
            .then(response => {
                // Almacenar los datos en el estado
                const mappedUsers = response.data.data.map((user) => ({
                    Genero: user.attributes.Genero,
                    Nombre: user.attributes.Nombre,
                    Password: user.attributes.Password
                }));
                // Verificar credenciales
                const isValidUser = mappedUsers.some(user => user.Nombre === loginData.Nombre && user.Password === loginData.Password);
                if (isValidUser) {
                    console.log('Inicio de sesión exitoso');
                   Navigate("/App")

                } else {
                    console.log('Credenciales incorrectas');
                   setError('Error al registrar el usuario. Por favor, inténtalo de nuevo.');
                }
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    };

    

    return (

        <>
        
            <div className="Login">
            <form className='FormLogin'>
                <h1>Inicio de Sesión</h1>
                <input
                    type="text"
                    name="Nombre"
                    placeholder='Usuario:'
                    value={loginData.Nombre}
                    onChange={handleChange}
                    
                />

                <br />
                <input
                    type="password"
                    name="Password"
                    placeholder='Password:'
                    value={loginData.Password}
                    onChange={handleChange}
                    
                />
                <br />
                <button onClick={handleLoginSubmit} type="submit">Iniciar Sesión</button>
                <button onClick={handleRegistrarSubmit} type = "submit">Registrarse</button>
            </form>
            <br />
        </div>
      
        
        </>

    );
}

export default Login;
