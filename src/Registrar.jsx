import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/Styles/Registrar.css';
import Header from './Header';

function Registrar() {
    const Navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        Nombre: "",
        Servicio: "",
        Horario: "",
        Costo: "", // Este campo se llenará automáticamente según el servicio seleccionado
        Fecha: "", // Almacenará la fecha seleccionada por el usuario desde el datepicker en formato 'YYYY-MM-DD'
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let costo = newUser.Costo; // Almacena el costo actual

        // Si el servicio es Corte, asigna el costo a 70
        // Si el servicio es Tinte, asigna el costo a 150
        // Si el servicio es Peinado, asigna el costo a 200
        if (name === "Servicio") {
            switch (value) {
                case "Corte":
                    costo = 70;
                    break;
                case "Tinte":
                    costo = 150;
                    break;
                case "Peinado":
                    costo = 200;
                    break;
                default:
                    costo = "";
                    break;
            }
        }

        setNewUser({
            ...newUser,
            [name]: value,
            Costo: costo,
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
                    Fecha: "",
                });
            })
            .catch((error) => {
                console.error("Error al registrar cita:", error);
            });

        Navigate("/App");
    };

    return (
        <>
        <Header title='Citas' desc='Registra tu cita'/>
            <form className='form1' onSubmit={handleSubmit}>
                <label className='label1'>
                    Nombre:
                    <input type="text" name="Nombre" value={newUser.Nombre} onChange={handleInputChange} required />
                </label>
                <br />
                <label>
                    Servicio:
                    <select className='Combo' name="Servicio" value={newUser.Servicio} onChange={handleInputChange} required>
                        <option value="">-- Selecciona una opción --</option>
                        <option>Corte</option>
                        <option>Tinte</option>
                        <option>Peinado</option>
                    </select>
                </label>
                <br />
                <label>
                    Fecha:
                    <input type="date" name="Fecha" value={newUser.Fecha} onChange={handleInputChange} required />
                </label>
                <br />
                <label>
                    Horario:
                    <input type="text" name="Horario" value={newUser.Horario} onChange={handleInputChange} required />
                </label>
                <br />
                <label>
                    Costo: ${newUser.Costo} {/* Muestra el costo */}
                </label>
                <br />
                <button type="submit">Registrar</button>
                <button onClick={() => Navigate("/App")}>Cancelar</button>
            </form>
        </>
    );
}

export default Registrar;

