import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/Styles/Registrar.css';
import Header from './Header';
import { UserContext } from './UserContext';

function Registrar() {
    const { user } = useContext(UserContext);
    const Navigate = useNavigate();
    const [data, setData] = useState([]);
    const [newUser, setNewUser] = useState({
        Nombre: user.Nombre,
        Servicio: "",
        Horario: "",
        Costo: "",
        Fecha: "",
    });

    useEffect(() => {
        axios.get('http://localhost:1337/api/citas')
            .then(response => {
                const reportesData = response.data.data.map(report => ({
                    id: report.id,
                    Nombre: report.attributes.Nombre,
                    Servicio: report.attributes.Servicio,
                    Horario: report.attributes.Horario,
                    Costo: report.attributes.Costo,
                    Fecha: report.attributes.Fecha,
                }));
                setData(reportesData);
            })
            .catch(error => {
                console.error('Error al obtener datos de citas:', error);
            });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let costo = newUser.Costo;

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

    const isHorarioAvailable = (selectedDate, selectedHorario) => {
        const citasEnFecha = data.filter(cita => cita.Fecha === selectedDate);
        const horarioOcupado = citasEnFecha.some(cita => cita.Horario === selectedHorario);

        if (horarioOcupado) {
            // Muestra una alerta si el horario seleccionado ya está ocupado
            alert('El horario seleccionado ya está ocupado. Por favor, elige otro.');
        }

        return !horarioOcupado;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedDate = newUser.Fecha;
        const selectedHorario = newUser.Horario;


        if (!isHorarioAvailable(selectedDate, selectedHorario)) {
            return; // Detiene el proceso si el horario no está disponible
        }

        axios
            .post("http://localhost:1337/api/citas", { "data": newUser })
            .then((response) => {
                console.log("Cita registrada:", response.data.data);

                setNewUser({
                    Nombre: "",
                    Servicio: "",
                    Horario: "",
                    Costo: "",
                    Fecha: "",
                });

                axios.get('http://localhost:1337/api/citas')
                    .then(response => {
                        const reportesData = response.data.data.map(report => ({
                            id: report.id,
                            Nombre: report.attributes.Nombre,
                            Servicio: report.attributes.Servicio,
                            Horario: report.attributes.Horario,
                            Costo: report.attributes.Costo,
                            Fecha: report.attributes.Fecha,
                        }));
                        setData(reportesData);
                    })
                    .catch(error => {
                        console.error('Error al obtener datos de citas:', error);
                    });
            })
            .catch((error) => {
                console.error("Error al registrar cita:", error);
            });

        Navigate("/App");
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

    return (
        <>
            <Header title='Citas' desc='Registra tu cita' />
            <form className='form1' onSubmit={handleSubmit}>
                <label className='label1'>
                    Nombre: {user.Nombre}
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
                    <select name="Horario" value={newUser.Horario} onChange={handleInputChange} required>
                        <option value="">-- Selecciona un horario --</option>
                        {generateHorarioOptions()}
                    </select>
                </label>
                <br />
                <label>
                    Costo: ${newUser.Costo}
                </label>
                <br />
                <button className='btnreg' type="submit">Registrar</button>
                <button className='btncan' onClick={() => Navigate("/App")}>Cancelar</button>
            </form>
        </>
    );
}

export default Registrar;





