// Importa las librerías y componentes necesarios
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Header from './Header';
import { UserContext } from './UserContext'; // Importa el contexto de usuario
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
    const handleEliminarUsuario = (id) => {
        axios.delete(`http://172.27.98.4:1337/api/citas/${id}`)
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
        const formattedDate = selectedDate.toLocaleDateString('es-ES'); // Ajusta 'es-ES' según tu localización
        axios.get('http://172.27.98.4:1337/api/citas')
            .then(response => {
                // Filtra las citas para mostrar solo las del día seleccionado
                const filteredCitas = response.data.data.filter(cita => {
                    const citaFecha = new Date(cita.attributes.Fecha).toLocaleDateString('es-ES');
                    return citaFecha === formattedDate;
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






