import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

function EditarCita() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editedUser, setEditedUser] = useState({
        Nombre: "",
        Servicio: "",
        Horario: "",
        Costo: "",
        Fecha: "",
    });
    const [data, setData] = useState([]); // Estado para almacenar los datos obtenidos de la API
    const [error, setError] = useState(null);

    useEffect(() => {
        // Obtener datos de la cita actual
        axios.get(`http://172.27.98.4:1337/api/citas/${id}`)
            .then(response => {
                setEditedUser(response.data.data.attributes);
            })
            .catch(error => {
                console.error('Error al obtener datos de las citas:', error);
            });

        // Obtener datos de todas las citas
        axios.get('http://172.27.98.4:1337/api/citas')
            .then(response => {
                const reportesData = response.data.data.map(report => ({
                    id: report.id,
                    Horario: report.attributes.Horario,
                    Fecha: report.attributes.Fecha,
                }));
                setData(reportesData);
            })
            .catch(error => {
                console.error('Error al obtener datos de citas:', error);
            });
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "Servicio") {
            const costo = calcularCosto(value);
            setEditedUser({
                ...editedUser,
                [name]: value,
                Costo: costo,
            });
        } else {
            setEditedUser({
                ...editedUser,
                [name]: value,
            });
        }
    };

    const calcularCosto = (servicio) => {
        switch (servicio) {
            case "Corte":
                return 70;
            case "Tinte":
                return 150;
            case "Peinado":
                return 200;
            default:
                return 0;
        }
    };

    const isHorarioAvailable = (selectedDate, selectedHorario) => {
        // Filtra los datos para obtener solo las citas en la fecha seleccionada
        const citasEnFecha = data.filter(cita => cita.Fecha === selectedDate);

        // Verifica si el horario seleccionado ya está ocupado en esa fecha
        return !citasEnFecha.some(cita => cita.Horario === selectedHorario);
    };

    const generateHorarioOptions = () => {
        const horarios = [];
        for (let hour = 10; hour <= 20; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const formattedHour = hour.toString().padStart(2, "0");
                const formattedMinute = minute.toString().padStart(2, "0");
                const time = `${formattedHour}:${formattedMinute}`;
                horarios.push(<option key={time} value={time}>{time}</option>);
            }
        }
        return horarios;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedDate = editedUser.Fecha;
        const selectedHorario = editedUser.Horario;

        // Verifica si el horario seleccionado está disponible
        if (!isHorarioAvailable(selectedDate, selectedHorario)) {
            // Muestra una alerta si el horario seleccionado ya está ocupado
            alert('El horario seleccionado ya está ocupado. Por favor, elige otro.');
            return;
        }

        axios.put(`http://172.27.98.4:1337/api/citas/${id}`, { "data": editedUser })
            .then(response => {
                console.log("Cita actualizada:", response.data.data);
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
            <Header title='Editar cita' desc='Modifica' />
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
                    <select name="Horario" value={editedUser.Horario} onChange={handleInputChange} required>
                        <option value="">-- Selecciona un horario --</option>
                        {generateHorarioOptions()}
                    </select>
                </label>
                <br />
                <label>
                    Costo:
                    <input type="text" name="Costo" value={editedUser.Costo} onChange={handleInputChange} required disabled />
                </label>
                <br />
                <button type="submit">Guardar Cambios</button>
                <button onClick={() => navigate("/App")}>Cancelar</button>
            </form>
        </>
    );
}

export default EditarCita;





