import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditarCita() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [editedUser, setEditedUser] = useState({
        Nombre: "",
        Servicio: "",
        Horario: "",
        Costo: "",
        Fecha: "", // Nuevo campo para la fecha
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        // Realizar una solicitud GET para obtener los datos del usuario a editar
        axios.get(`http://localhost:1337/api/citas/${id}`)
            .then(response => {
                // Almacenar los datos del usuario en el estado
                setEditedUser(response.data.data.attributes);
            })
            .catch(error => {
                console.error('Error al obtener datos de las citas:', error);
            });
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedUser({
            ...editedUser,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Realizar una solicitud PUT para actualizar el usuario
        axios.put(`http://localhost:1337/api/citas/${id}`, { "data": editedUser })
            .then(response => {
                // Aquí puedes manejar la respuesta si es necesario
                console.log("Cita actualizada:", response.data.data);

                // Redirigir a la lista de usuarios después de editar
                navigate("/App");
            })
            .catch((error) => {
                setError(error);
            });
    };

    if (error) {
        return <div>Error al editar la cita: {error.message}</div>;
    }

    return (
        <>
            <form className='form1' onSubmit={handleSubmit}>
                <label className='label1'>
                    Nombre:
                    <input type="text" name="Nombre" value={editedUser.Nombre} onChange={handleInputChange} required />
                </label>
                <br />
                <label>
                    Servicio:
                    <select className='Combo' name="Servicio" value={editedUser.Servicio} onChange={handleInputChange} required>
                        <option value="">-- Selecciona una opción --</option>
                        <option>Corte</option>
                        <option>Tinte</option>
                        <option>Peinado</option>
                    </select>
                </label>
                <br />
                <label>
                    Fecha:
                    <input type="date" name="Fecha" value={editedUser.Fecha} onChange={handleInputChange} required />
                </label>
                <br />
                <label>
                    Horario:
                    <input type="text" name="Horario" value={editedUser.Horario} onChange={handleInputChange} required />
                </label>
                <br />
                <label>
                    Costo:
                    <input type="text" name="Costo" value={editedUser.Costo} onChange={handleInputChange} required />
                </label>
                <br />
                <button type="submit">Guardar Cambios</button>
                <button onClick={() => navigate("/App")}>Cancelar</button>
            </form>
        </>
    );
}

export default EditarCita;
