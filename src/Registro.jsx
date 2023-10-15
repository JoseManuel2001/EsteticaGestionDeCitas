import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../src/Styles/Registro.css';

function Registro() {
    const [Nombre, setNombre] = useState('');
    const [Genero, setGenero] = useState(''); // Estado para almacenar el género seleccionado
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const Navigate = useNavigate();

    const handleCancelar = () => {
        Navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1337/api/usuarios', {
                "data": {
                    Nombre,
                    Genero,
                    email,
                    Password,
                },
            });
            console.log('Usuario registrado:', response.data);
            // Aquí puedes manejar la redirección o mostrar un mensaje de éxito al usuario
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
        }
        Navigate('/');
    };

    return (
        <div>
            <h2>Registro</h2>
            <form>
                <label>
                    Nombre:
                    <input type="text" value={Nombre} onChange={(e) => setNombre(e.target.value)} />
                </label>
                <br />
                <label>
                    Género:
                    {/* Utiliza un select para el género */}
                    <select value={Genero} onChange={(e) => setGenero(e.target.value)}>
                        <option value="">-- Selecciona un género --</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </label>
                <br />
                <label>
                    Email:
                    <input className='label' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button onClick={handleSubmit} type="button">Registrarse</button>
                <button onClick={handleCancelar} type="button">Cancelar</button>
            </form>
        </div>
    );
}

export default Registro;
