// Importa las librerías y componentes necesarios
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Header from './Header';
import { UserContext } from './UserContext'; // Importa el contexto de usuario
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { utcToZonedTime } from 'date-fns-tz';
import '../src/Styles/App.css';

// Define el componente principal
function App() {
    // Estados y funciones del componente
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { user } = useContext(UserContext); // Obtiene el usuario autenticado del contexto
    const navigate = useNavigate();

    // Función para manejar la redirección a la página de registro de citas
    const handleClickAgregar = () => {
        navigate("/Registrar");
    };

    // Función para manejar la redirección a la página de edición de citas
    const handleClickEditar = (id) => {
        navigate(`/editarCitas/${id}`);
    };

    // Función para eliminar una cita
    const handleEliminarUsuario = (id, citaFecha, citaHorario) => {
        const now = new Date();
        const citaCompleta = new Date(`${citaFecha} ${citaHorario}`);
    
        // Calcula la diferencia en milisegundos
        const timeDifference = citaCompleta - now;
    
        // Convierte la diferencia de tiempo a minutos
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    
        if (minutesDifference < 30) {
            // No permitir eliminar si la cita está dentro de los próximos 30 minutos
            console.log('No se puede eliminar la cita dentro de los próximos 30 minutos.');
            return;
        }
    
        axios.delete(`http://localhost:1337/api/citas/${id}`)
            .then(response => {
                console.log("Cita Eliminada:", response.data);
                setData(prevData => prevData.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error('Error al eliminar la cita:', error);
            });
    };


    const handleClickReportes = () => {
        navigate('/Reportes');
    };

    // Efecto que se ejecuta al cambiar la fecha seleccionada
    // Efecto que se ejecuta al cambiar la fecha seleccionada
    // Efecto que se ejecuta al cambiar la fecha seleccionada
    useEffect(() => {
        const mexicoTimeZone = 'America/Mexico_City';
        const formattedDate = format(selectedDate, 'yyyy-MM-dd', { locale: es }); // Formato 'YYYY-MM-DD'

        axios.get('http://localhost:1337/api/citas')
            .then(response => {
                const filteredCitas = response.data.data.filter(cita => {
                    const citaDate = parseISO(cita.attributes.Fecha);
                    const zonedCitaDate = utcToZonedTime(citaDate, mexicoTimeZone);
                    const formattedCitaDate = format(zonedCitaDate, 'yyyy-MM-dd', { locale: es });

                    return formattedCitaDate === formattedDate;
                });

                const mappedCitas = filteredCitas.map(cita => ({
                    id: cita.id,
                    Nombre: cita.attributes.Nombre,
                    Servicio: cita.attributes.Servicio,
                    Horario: cita.attributes.Horario,
                    Costo: cita.attributes.Costo,
                    Fecha: cita.attributes.Fecha,
                }));

                setData(mappedCitas);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    }, [selectedDate]);



    // Renderizado del componente
    return (
        <>
            {/* Encabezado de la aplicación */}
            <Header title='Citas' desc='Lista de citas' />

            {/* Contenido principal */}
            <div className='content'>
                <div className="App">
                    <div className='opciones'>
                        <label> Selecciona el día</label>
                        <DatePicker className="Date" selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                        <button className='ButtonA' onClick={handleClickAgregar}>Añadir</button>
                    </div>
                    <table className='UsuariosT'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th className='th1'>Servicio</th>
                                <th>Horario</th>
                                <th>Costo</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((cita) => (
                                <tr key={cita.id}>
                                    <td>{cita.Nombre}</td>
                                    <td className='td1'>{cita.Servicio}</td>
                                    <td>{cita.Horario}</td>
                                    <td>{cita.Costo}</td>
                                    <td>{cita.Fecha}</td>
                                    <td className='Botones'>
                                        {
                                            (user.Role === 'Admin' || user.Nombre === cita.Nombre)
                                            &&
                                            <>
                                                <button onClick={() => handleClickEditar(cita.id)}>Editar</button>
                                                <button onClick={() => handleEliminarUsuario(cita.id)}>Eliminar</button>
                                            </>
                                        }

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='divRep'>
                {
                    user.Role === 'Admin' &&
                    <button className='ButtonR' onClick={handleClickReportes}>Reportes</button>
                }
            </div>
        </>
    );
}

// Exporta el componente principal
export default App;






