import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/Styles/Registrar.css'

function Registrar() {
    const Navigate = useNavigate();

    const hadleClick = () => {
        Navigate("/App")
    }

    const [newUser, setNewUser] = useState({
        Nombre: "",
        Servicio: "",
        Horario: "",
        Costo: "",
    });
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();


        // Realiza una solicitud POST para crear un nuevo usuario
        axios
            .post("http://localhost:1337/api/citas", { "data": newUser }) // Cambia la URL a la correcta
            .then((response) => {
                // Aquí puedes manejar la respuesta si es necesario
                console.log("Cita registrada:", response.data.data);

                // Limpiar el formulario
                setNewUser({
                    Nombre: "",
                    Servicio: "",
                    Horario: "",
                    Costo: "",
                });
            })
            .catch((error) => {
                setError(error);
            });

        Navigate("/App")
    };

    if (error) {
        return <div>Error al registrar cita: {error.message}</div>;
    }

    return (
        <>
            <form className='form1' onSubmit={handleSubmit}>
                <label className='label1'>
                    Nombre:
                    <input type="text" name="Nombre" value={newUser.Nombre} onChange={handleInputChange} required />
                </label>
                <br />
                <label>
                    Servicio:
                    <select default={" "} className='Combo' name="Servicio" value={newUser.Servicio} onChange={handleInputChange} required>
                        <option value="">-- Selecciona una opción --</option>
                        <option>Corte</option>
                        <option>Tinte</option>
                        <option>Peinado</option>
                    </select>
                </label>
                <br />
                <label>
                    Horario:
                    <input type="text" name="Horario" value={newUser.Horario} onChange={handleInputChange} required />
                </label>
                <br />
                <label>
                    Costo:
                    <input type="text" name="Costo" value={newUser.Costo} onChange={handleInputChange} required />
                </label>
                <br />
                <button  type="submit">Registrar</button>
                <button  onClick={hadleClick}>Cancelar</button>
            </form>
        </>
    );
}
export default Registrar;